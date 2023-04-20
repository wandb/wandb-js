import {Messenger} from './interface/messenger.js';
import {Settings} from './settings.js';
import {runStack} from './wandb_init.js';
import wandb from '../index.js';

export class Run {
  project: string;

  entity: string;

  id: string;

  settings: Settings;

  step: number;

  name?: string;

  _messenger: Messenger;

  constructor(
    project: string,
    entity: string,
    id: string,
    messenger: Messenger,
    settings: Settings,
    name?: string
  ) {
    this.project = project;
    this.entity = entity;
    this.id = id;
    this.name = name;
    this.step = 0;
    this.settings = settings;
    this._messenger = messenger;
  }

  log(data: Record<string, unknown>, step?: number, commit?: boolean) {
    if (step != null) {
      this.step = step;
    }
    // eslint-disable-next-line no-param-reassign
    data._step = this.step;
    this._messenger.log({data, step: this.step, commit});
    if (step == null) {
      this.step += 1;
    }
  }

  async finish(code?: number) {
    this._messenger.finish({code: code || 0});
    if (!this.settings.silent) {
      console.log(`View run at ${this.url()}`);
    }
    await this._messenger.terminate();
    runStack.delete(this);
    wandb.runPromise = null;
  }

  url(): string {
    // TODO: handle QA etc.
    const baseUrl = this.settings.baseUrl.replace('api.wandb', 'wandb');
    return `${baseUrl}/${this.entity}/${this.project}/runs/${this.id}`;
  }
}
