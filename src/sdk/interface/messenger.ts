import type {MessageChannel, MessagePort, Worker} from 'node:worker_threads';
import {config} from '../lib/config.js';
import {Sender} from '../../internal/sender.js';
import {Settings} from '../settings.js';
import {generateId} from '../lib/runid.js';
import {debugLog} from '../lib/util.js';
import {InitOptions} from '../wandb_init.js';
import {Run} from '../wandb_run.js';

export interface InitRecord {
  type: 'init';
  payload: {
    name: string;
    entity: string;
    project: string;
    displayName?: string;
    config?: any;
  };
}

export interface RunRecord {
  type: 'run';
  payload: {
    id?: string;
    name: string;
    displayName: string;
    project: string;
    entity: string;
  };
}

export interface LogRecord {
  type: 'log';
  payload: {
    data: any;
    step?: number;
    commit?: boolean;
  };
}

export interface PingRecord {
  type: 'ping';
  payload: {
    time: number;
  };
}

export interface FinishRecord {
  type: 'finish';
  payload: {
    code: number;
    signal?: string;
  };
}

export interface ErrorRecord {
  type: 'error';
  payload: {
    reason?: string;
  };
}

export type SenderRecord = InitRecord | LogRecord | PingRecord | FinishRecord;

export type ReceiverRecord = RunRecord | ErrorRecord | FinishRecord;

export function initRunPayload({
  project,
  entity,
  name,
  id,
  config,
}: InitOptions): InitRecord['payload'] {
  let safeId: string = id || '';
  let safeProject: string = project || '';
  const safeEntity: string = entity || '';
  if (safeId === '') {
    safeId = generateId();
  }
  if (safeProject === '') {
    safeProject = 'uncategorized';
  }
  // NOTE: We make id name, and name displayName to play nice with graphql
  // TODO: figure out where to add _wandb and telemetry to config / handle updates
  return {
    name: safeId,
    project: safeProject,
    entity: safeEntity,
    displayName: name,
    config: JSON.stringify(config),
  };
}

export class Messenger {
  port: MessagePort | Worker;

  exiting: Promise<void> | null = null;

  settings: Settings;

  sender?: Sender;

  setupPromise: Promise<void>;

  callback?: (run: Run) => void;

  constructor(settings: Settings, callback?: (run: Run) => void) {
    this.settings = settings;
    this.callback = callback;
    this.setupPromise = this.setup().catch(e => {
      throw e;
    });
  }

  async setup(): Promise<void> {
    let AsyncMessageChannel: any;
    let AsyncWorker: any;
    if (typeof window === 'undefined') {
      const ws = await import('node:worker_threads');
      AsyncMessageChannel = ws.MessageChannel;
      AsyncWorker = ws.Worker;
    } else {
      AsyncMessageChannel = window.MessageChannel;
    }
    const channel = new AsyncMessageChannel() as MessageChannel;
    if (config().ENABLE_WORKER) {
      // TODO: decide if this is a good idea / support browser workers
      const worker = new AsyncWorker(require.resolve('../../internal/main'), {
        execArgv:
          config().ENV === 'development'
            ? ['-r', 'ts-node/register/transpile-only']
            : undefined,
        workerData: this.settings,
      });
      this.port = worker;
      this.sender = new Sender(this.settings);
    } else {
      this.port = channel.port1;
      this.sender = new Sender(this.settings, channel.port2);
    }
    this.addListeners();
  }

  addListeners(): void {
    this.port.on('message', (msg: ReceiverRecord) => {
      if (msg.type === 'run') {
        debugLog('wandb.init finished');
        const run = new Run(
          msg.payload.project,
          msg.payload.entity,
          msg.payload.name,
          this,
          this.settings,
          msg.payload.displayName
        );
        if (this.callback != null) {
          this.callback(run);
        }
      } else if (msg.type === 'error') {
        throw new Error(msg.payload.reason);
      } else {
        // TODO: other stuff
      }
    });
    // TODO: shutdown here as well?
    this.port.on('error', err => {
      throw err;
    });
    this.port.on('exit', code => {
      if (code !== 0) {
        throw new Error(`Worker stopped with exit code ${code}`);
      }
    });
  }

  async init(payload: InitRecord['payload']): Promise<void> {
    // TODO: don't love starting the sender here...
    await this.setupPromise;
    await this.sender?.start();
    this.port.postMessage({
      type: 'init',
      payload,
    });
  }

  finish(payload: FinishRecord['payload']): void {
    this.port.postMessage({
      type: 'finish',
      payload,
    });
  }

  log(payload: LogRecord['payload']): void {
    this.port.postMessage({
      type: 'log',
      payload,
    });
  }

  async terminate(): Promise<void> {
    if (this.exiting != null) {
      return this.exiting;
    }
    this.exiting = new Promise((resolve, reject) => {
      if ('terminate' in this.port) {
        (this.port as Worker)
          .terminate()
          .then(() => resolve())
          .catch(reject);
      } else {
        this.port.close();
        this.sender?.stop().then(resolve, reject);
      }
    });
    return this.exiting;
  }
}
