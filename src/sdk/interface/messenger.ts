import {Worker, MessageChannel, MessagePort} from 'worker_threads';
import {Sender} from '../../internal/sender.js';
import {Settings} from '../settings.js';
import {generateId} from '../lib/runid.js';
import {InitOptions} from '../wandb_init.js';

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
  if (id == null) {
    id = generateId();
  }
  if (project == null) {
    project = 'uncategorized';
  }
  if (entity == null) {
    entity = '';
  }
  // NOTE: We make id name, and name displayName to play nice with graphql
  // TODO: figure out where to add _wandb and telemetry to config / handle updates
  return {
    name: id,
    project,
    entity,
    displayName: name,
    config: JSON.stringify(config),
  };
}

export class Messenger {
  port: MessagePort | Worker;
  exiting: Promise<void> | null = null;
  sender?: Sender;
  constructor(settings: Settings) {
    const channel = new MessageChannel();
    if (process.env.WANDB_WORKER === 'true') {
      // TODO: decide if this is a good idea / support browser workers
      const worker = new Worker(require.resolve('../../internal/main'), {
        execArgv:
          process.env.WANDB_ENV === 'development'
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
    this.exiting = new Promise(async resolve => {
      if (this.port instanceof Worker) {
        this.port.terminate();
      } else {
        this.port.close();
        await this.sender?.stop();
      }
      resolve();
    });
    return this.exiting;
  }
}
