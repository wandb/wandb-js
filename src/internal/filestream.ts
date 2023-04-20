import fetch from 'cross-fetch';
import {Queue} from './queue.js';
import {Settings} from '../sdk/settings.js';
import {Delay, requestWithRetry} from '../sdk/lib/retry.js';
import {debugLog} from '../sdk/lib/util.js';
import {config} from '../sdk/lib/config.js';
import {InitRecord} from '../sdk/interface/messenger.js';

interface FsFinishedData {
  complete: boolean;
  exitcode: number;
}

interface FsChunkData {
  offset?: number;
  content: string[];
}

interface FsRecordData {
  [key: string]: FsChunkData;
}

interface FsOffsets {
  [key: string]: number;
}

interface FsFilesData {
  files: FsRecordData;
}

interface LastChunk {
  offset: number;
  data: Record<string, unknown>;
}

export class FileStream {
  // TODO:  Consider changing this to bytes
  MAX_ITEMS = 10000;

  code = 0;

  private _thread: Promise<void>;

  private runPath: string;

  private offsets: FsOffsets = {};

  private settings: Settings;

  private queue: Queue<FsRecordData>;

  private shutdown = false;

  private started = 0;

  private delay: Delay;

  private lastChunks: {[key: string]: LastChunk} = {
    'wandb-history.jsonl': {offset: 0, data: {}},
    'wandb-summary.json': {offset: 0, data: {}},
  };

  constructor(settings: Settings) {
    this.settings = settings;
    this.queue = new Queue();
    this.delay = new Delay(1000);
  }

  public async stop(code?: number) {
    if (code != null) {
      this.code = code;
    }
    this.shutdown = true;
    this.delay.cancel();
    await this._thread;
  }

  public start(run: InitRecord['payload']): Promise<void> {
    // TODO: potentially wire in this state from somewhere higher up
    this.started = Date.now();
    this.shutdown = false;
    this.runPath = `/files/${run.entity}/${run.project}/${run.name}/file_stream`;
    this._thread = this._thread_body();
    return this._thread;
  }

  // TODO: rethink this
  public logHistory(
    data: Record<string, unknown>,
    step?: number,
    commit?: boolean
  ) {
    const sc = this.lastChunks['wandb-summary.json'];
    const hc = this.lastChunks['wandb-history.jsonl'];
    if (Object.keys(data).length === 0 && Object.keys(hc.data).length === 0) {
      // Nothing to do, we might be able to get rid of this case
      return;
    }
    // Add timestamps
    /* eslint-disable no-param-reassign */
    data._runtime = this.runtimeSeconds();
    data._timestamp = Date.now() / 1000;
    hc.data = {...hc.data, ...data};
    sc.data = {...sc.data, ...data};
    debugLog('filestream logHistory', hc.data, step, hc.offset);
    if (!this.shutdown && commit === false) {
      return;
    }
    if (this.shutdown || (step != null && step >= hc.offset)) {
      this.bufferRecord({
        'wandb-history.jsonl': {
          content: [JSON.stringify(hc.data)],
          offset: hc.offset,
        },
      });
      hc.offset += 1;
      hc.data = {};
    }
  }

  public bufferRecord(rec: FsRecordData) {
    if (this.settings.offline) {
      return;
    }
    debugLog('filestream buffered record', rec);
    this.queue.enqueue(rec);
  }

  public async sendRecords(): Promise<number> {
    if (this.queue.isEmpty()) {
      return 0;
    }
    let items = 0;
    const fsdata: FsFilesData = {files: {}};
    let historyUpdated = false;
    while (items < this.MAX_ITEMS) {
      const rec = this.queue.dequeue();
      if (rec == null) {
        break;
      }
      for (const [key, val] of Object.entries(rec)) {
        if (key === 'wandb-history.jsonl') {
          historyUpdated = true;
        }
        // TODO: may not need to account for offsets here
        if (val.offset == null) {
          val.offset = this.offsets[key] || 0;
        }
        this.offsets[key] = val.offset + val.content.length;
        items += val.content.length;
        if (fsdata.files[key] != null) {
          fsdata.files[key].content.push(...val.content);
        } else {
          fsdata.files[key] = val;
        }
      }
    }
    if (historyUpdated) {
      const sc = this.lastChunks['wandb-summary.json'];
      fsdata.files['wandb-summary.json'] = {
        content: [JSON.stringify(sc.data)],
        offset: 0,
      };
    }
    debugLog('filestream sent records', fsdata);
    await this.send(fsdata);
    return items;
  }

  public runtimeSeconds(): number {
    return (Date.now() - this.started) / 1000;
  }

  private currentDelay(): number {
    const elapsed = this.runtimeSeconds();
    if (elapsed < 30) {
      return 2_000;
    }
    if (elapsed < 30 * 5) {
      return 10_000;
    }
    return 30_000;
  }

  private async send(fsdata: FsFilesData | FsFinishedData) {
    // TODO: think about retry logic here
    const res = await requestWithRetry(
      fetch(this.settings.baseUrl + this.runPath, {
        method: 'POST',
        body: JSON.stringify(fsdata),
        headers: {
          'User-Agent': `W&B Internal JS Client ${config().VERSION}`,
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(
            `api:${this.settings.apiKey}`
          ).toString('base64')}`,
        },
      }),
      {maxAttempts: 60, maxDelayMs: 30_000}
    );
    return res;
  }

  private async sendFinish() {
    const fsdata: FsFinishedData = {complete: true, exitcode: this.code};
    await this.send(fsdata);
  }

  private async _thread_body() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (this.shutdown) {
        debugLog('Exiting filestream loop via shutdown');
        // Ensure we commit our final history record
        this.logHistory({});
        await this.sendRecords();
        break;
      }
      await this.sendRecords();
      await this.delay.wait(this.currentDelay());
    }
    debugLog('Filestream main loop broke');
    await this.sendFinish();
  }
}
