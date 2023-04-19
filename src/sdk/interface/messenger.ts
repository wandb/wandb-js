import type {MessagePort, Worker} from 'node:worker_threads';
import {config} from '../lib/config.js';
import {Sender} from '../../internal/sender.js';
import {Settings} from '../settings.js';
import {generateId} from '../lib/runid.js';
import {InitOptions} from '../wandb_init.js';

/* eslint-disable tree-shaking/no-side-effects-in-initialization */
let AsyncMessageChannel: any;
let AsyncWorker: any;
async function init() {
  if (typeof window === 'undefined') {
    const ws = await import('node:worker_threads');
    AsyncMessageChannel = ws.MessageChannel;
    AsyncWorker = ws.Worker;
  } else {
    AsyncMessageChannel = window.MessageChannel;
  }
}
init().catch(e => {
  console.error('Error initializing MessageChannel', e);
});

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

  sender?: Sender;

  constructor(settings: Settings) {
    // TODO: figure out how to import MessageChannel only in node
    const channel = new AsyncMessageChannel();
    if (config().ENABLE_WORKER) {
      // TODO: decide if this is a good idea / support browser workers
      const worker = new AsyncWorker(require.resolve('../../internal/main'), {
        execArgv:
          config().ENV === 'development'
            ? ['-r', 'ts-node/register/transpile-only']
            : undefined,
        workerData: settings,
      });
      this.port = worker;
      this.sender = new Sender(settings);
    } else {
      this.port = channel.port1;
      this.sender = new Sender(settings, channel.port2);
    }
  }

  async init(payload: InitRecord['payload']): Promise<void> {
    // TODO: don't love starting the sender here...
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
