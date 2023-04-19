import type {MessagePort} from 'node:worker_threads';
import {Delay} from '../sdk/lib/retry.js';
import {Queue} from './queue.js';
import {InternalApi} from './api.js';
import {FileStream} from './filestream.js';
import {Settings} from '../sdk/settings.js';
import {debugLog} from '../sdk/lib/util.js';
import {SenderRecord} from '../sdk/interface/messenger.js';

/* eslint-disable tree-shaking/no-side-effects-in-initialization */
let asyncParentPort: any;
async function init() {
  if (typeof window === 'undefined') {
    const ws = await import('node:worker_threads');
    asyncParentPort = ws.parentPort;
  }
}
init().catch(e => {
  console.error('Error initializing MessageChannel', e);
});

export class Sender {
  queue: Queue<SenderRecord>;

  delay: Delay;

  port: MessagePort | null;

  api: InternalApi;

  code: number;

  filestream: FileStream;

  _thread: Promise<void>;

  _shutdown: boolean;

  constructor(settings: Settings, port?: MessagePort) {
    this.queue = new Queue();
    this.delay = new Delay(1000);
    this.port = port || asyncParentPort;
    this.api = new InternalApi(settings.baseUrl, settings.apiKey);
    this.filestream = new FileStream(settings);
    this._shutdown = false;

    this.port?.on('message', (msg: SenderRecord) => {
      debugLog('sender queued', msg);
      this.queue.enqueue(msg);
    });
    // TODO: is this right?
    this.port?.on('close', () => {
      this.delay.cancel();
      this._shutdown = true;
    });
  }

  async start() {
    this._shutdown = false;
    // TODO: this could go to a better place
    await this.api.ensureDefaultEntity();
    this._thread = this._thread_body();
  }

  async stop() {
    this.delay.cancel();
    this._shutdown = true;
    await this._thread;
  }

  error(reason?: string) {
    this.port?.postMessage({type: 'error', payload: {reason}});
    // TODO: refactor error code passing
    this.code = 1;
    this.stop().catch(e => {
      console.error('Failed to stop sender', e);
    });
  }

  // This is currently where the magic happens
  async _thread_body() {
    /* eslint-disable no-labels */
    /* eslint-disable no-constant-condition */
    outside: while (true) {
      const record = this.queue.dequeue();
      if (record == null) {
        if (this._shutdown) {
          debugLog('Exiting sender loop via shutdown');
          // TODO: remove hack to get final queued items
          await this.delay.wait(100);
          if (this.queue.isEmpty()) {
            debugLog('Sender queue is empty, exiting');
            break;
          } else {
            debugLog('sender queue has data, continue');
          }
        }
        // TODO: consider adding this if we put the sender in a sperate process
        // this.port?.postMessage({type: 'ping', payload: null});
        await this.delay.wait();
      } else {
        debugLog('Sender message: ', record);
        // NOTICE: don't await in this loop, we should keep it as tight as possible
        switch (record.type) {
          case 'init':
            this.api
              .upsertRun(record.payload)
              .then(res => {
                if (res == null) {
                  this.error('Failed to upsert run');
                }
                const displayName = res.upsertBucket?.bucket?.displayName;
                this.port?.postMessage({
                  type: 'run',
                  payload: {...record.payload, displayName},
                });
                this.filestream.start(record.payload).catch(e => {
                  this.error(e);
                });
              })
              .catch(e => {
                this.error(e);
              });
            break;
          case 'log':
            this.filestream.logHistory(
              record.payload.data,
              record.payload.step,
              record.payload.commit
            );
            break;
          case 'finish':
            debugLog('Exiting sender thread via finish');
            this.filestream.code = record.payload.code;
            // TODO: may not be necessary...
            this.port?.postMessage({
              type: 'finish',
              payload: record.payload,
            });
            break outside;
          default:
            this.error(`Unhandle message type: ${record.type}`);
        }
      }
    }
    debugLog('Broke sender loop');
    this.port?.close();
    await this.filestream.stop(this.code);
  }
}
