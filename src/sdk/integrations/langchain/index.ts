// eslint-disable-next-line import/no-extraneous-dependencies
import {getCallbackManager, ConsoleCallbackHandler} from 'langchain/callbacks';
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
import {patchCallbacks} from './patch.js'; // ensurePatched, clearPatches,
import wandb from '../../../index.js';

export class WandbTracer extends BaseTracer {
  static _instance: WandbTracer | null = null;

  static _getCallbackManager: any | null = null;

  static _ConsoleCallbackHandler: any | null = null;

  private static _run: Run | null = null;

  private static _runArgs: Record<string, unknown> | null = null;

  private _session: TracerSession | null = null;

  constructor() {
    super();
  }

  static wrap(obj: any) {
    return patchCallbacks(obj);
  }

  static async watchAll(
    runArgs: InitOptions | null = null,
    includeStdout = true,
    additionalHandlers: any[] = []
  ): Promise<Run | null> {
    // ensurePatched();
    const tracer = new WandbTracer();
    await tracer.init(runArgs);
    await tracer.loadSession('');
    const manager = getCallbackManager();
    const handlers: any[] = [tracer];
    if (includeStdout) {
      handlers.push(new ConsoleCallbackHandler());
    }
    manager.setHandlers(handlers.concat(additionalHandlers));
    return WandbTracer._run;
  }

  static async stopWatch() {
    // clearPatches();
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
      return null;
    }
    WandbTracer._instance = this;
    WandbTracer._runArgs = runArgs;
    WandbTracer._run = null;

    const newRunArgs: InitOptions = {...runArgs};

    if (!('settings' in newRunArgs)) {
      newRunArgs.settings = settingsWithOverrides({silent: true});
    }

    const run = await wandb.init(newRunArgs);
    WandbTracer._run = run;
    console.log(`Streaming LangChain activity to W&B at: ${this.wandbUrl}`);
    return run;
  }

  async finish(): Promise<void> {
    if (WandbTracer._run != null) {
      await WandbTracer._run.finish();
      console.log(`Finished uploading data to W&B at ${this.wandbUrl}`);
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
