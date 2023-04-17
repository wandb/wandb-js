import {
  BaseCallbackHandler,
  ConsoleCallbackHandler,
  getCallbackManager,
} from 'langchain/callbacks';
import {
  LLMRun,
  ChainRun,
  ToolRun,
  BaseTracer,
  TracerSession,
  TracerSessionCreate,
} from './types.js';
import {
  getSpanProducingObject,
  convertLcRunToWbSpan,
  safeMaybeModelDict,
} from './conversion.js';
import {Run} from '../../wandb_run.js';
import {InitOptions} from '../../wandb_init.js';
import {settingsWithOverrides} from '../../settings.js';
import {WBTraceTree} from '../../data_types/trace_tree.js';
import wandb from '../../../index.js';

export class WandbTracer extends BaseTracer {
  static _instance: WandbTracer | null = null;
  private static _run: Run | null = null;
  private static _runArgs: any | null = null;
  private _session: TracerSession | null = null;

  constructor() {
    super();
  }

  static async watchAll(
    runArgs: InitOptions | null = null,
    includeStdout: boolean = true,
    additionalHandlers: BaseCallbackHandler[] = []
  ): Promise<Run | null> {
    const tracer = new WandbTracer();
    await tracer.init(runArgs);
    tracer.loadSession('');
    const manager = getCallbackManager();
    const handlers: BaseCallbackHandler[] = [tracer];
    if (includeStdout) {
      handlers.push(new ConsoleCallbackHandler());
    }
    manager.setHandlers(handlers.concat(additionalHandlers));
    return WandbTracer._run;
  }

  static async stopWatch() {
    if (WandbTracer._instance) {
      await WandbTracer._instance.finish();
      const manager = getCallbackManager();
      manager.setHandlers([]);
    }
  }

  get wandbUrl(): string {
    if (WandbTracer._run) {
      return WandbTracer._run.url();
    }
    return 'https://wandb.ai';
  }

  async init(runArgs: InitOptions | null = null): Promise<Run | null> {
    if (
      WandbTracer._run != null &&
      JSON.stringify(WandbTracer._runArgs) === JSON.stringify(runArgs)
    ) {
      console.log(`Find results at: ${this.wandbUrl}`);
      return null;
    }
    WandbTracer._instance = this;
    WandbTracer._runArgs = runArgs;
    WandbTracer._run = null;

    const newRunArgs: InitOptions = {...runArgs};

    if (!('settings' in newRunArgs)) {
      newRunArgs['settings'] = settingsWithOverrides({silent: true});
    }

    const run = await wandb.init(newRunArgs);
    WandbTracer._run = run;
    console.log(`Find results at: ${this.wandbUrl}`);
    return run;
  }

  async finish(): Promise<void> {
    if (WandbTracer._run != null) {
      await WandbTracer._run.finish();
      console.log(`Run finished.  Find results at ${this.wandbUrl}`);
    } else {
      console.log('W&B run not started. Skipping.');
    }
  }

  private _logTrace(model_trace: WBTraceTree): void {
    if (WandbTracer._run) {
      // TODO: wire up JSON conversion elsewhere...
      WandbTracer._run.log({langchain_trace: model_trace.toJSON()});
    }
  }

  _generateId(): number | string | null {
    return null;
  }

  protected async persistRun(run: LLMRun | ChainRun | ToolRun): Promise<void> {
    this._logTrace(
      new WBTraceTree(
        convertLcRunToWbSpan(run),
        safeMaybeModelDict(getSpanProducingObject(run))
      )
    );
  }

  protected async persistSession(
    sessionCreate: TracerSessionCreate
  ): Promise<TracerSession> {
    return {id: 1, ...sessionCreate};
  }

  async loadSession(sessionName: string): Promise<TracerSession> {
    this._session = {id: 1, start_time: Number(new Date()), name: sessionName};
    return this._session;
  }

  async loadDefaultSession(): Promise<TracerSession> {
    this._session = {id: 1, start_time: Number(new Date()), name: 'default'};
    return this._session;
  }
}
