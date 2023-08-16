// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BaseTracer,
  Run as LCRun,
  Callbacks,
  CallbackManager,
  CallbackManagerOptions,
} from 'langchain/callbacks';
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
  name = 'wandb_tracer';

  static _instance: WandbTracer | null = null;

  private static _run: Run | null = null;

  private static _runArgs: Record<string, unknown> | null = null;

  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static wrap(obj: any) {
    return patchCallbacks(obj);
  }

  static async init(
    runArgs?: InitOptions | null,
    verbose?: boolean,
    additionalHandlers?: Callbacks,
    callbackManagerParams?: {
      localHandlers?: Callbacks,
      inheritableTags?: string[],
      localTags?: string[],
      inheritableMetadata?: Record<string, unknown>,
      localMetadata?: Record<string, unknown>,
      options?: CallbackManagerOptions
    }
  ): Promise<CallbackManager | undefined> {
    // ensurePatched();
    const tracer = new WandbTracer();
    await tracer.initRun(runArgs);
    const handlers = [tracer];

    return CallbackManager.configure(
      handlers,
      additionalHandlers || callbackManagerParams?.localHandlers,
      callbackManagerParams?.inheritableTags,
      callbackManagerParams?.localTags,
      callbackManagerParams?.inheritableMetadata,
      callbackManagerParams?.localMetadata, {
        ...callbackManagerParams?.options,
        verbose: verbose ?? true,
      });
  }

  static async finish() {
    // clearPatches();
    if (WandbTracer._instance) {
      await WandbTracer._instance.finish();
    }
  }

  get wandbUrl(): string {
    // TODO: make anonymode work here
    if (WandbTracer._run) {
      return WandbTracer._run.url();
    }
    return 'https://wandb.ai';
  }

  async initRun(runArgs: InitOptions | null = null): Promise<Run | null> {
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

  protected async persistRun(run: LCRun): Promise<void> {
    console.log('persistRun', run);
    this._logTrace(
      new WBTraceTree(
        convertLcRunToWbSpan(run),
        safeMaybeModelDict(getSpanProducingObject(run))
      )
    );
  }
}
