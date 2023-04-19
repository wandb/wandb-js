/* eslint-disable import/no-extraneous-dependencies */
import {ChainValues, LLMResult} from 'langchain/schema';
import {BaseCallbackHandler} from 'langchain/callbacks';

/* These are temporary as langchain isn't exporting them.

These are currently up to date with version 0.0.56 of langchain

TODO: get rid of these when they're exposed in the library.
*/

export type RunType = 'llm' | 'chain' | 'tool';

export interface BaseTracerSession {
  start_time: number;
  name?: string;
}

export type TracerSessionCreate = BaseTracerSession;

export interface TracerSession extends BaseTracerSession {
  id: number;
}

// TODO: get _self in here
export interface BaseRun {
  id?: number;
  start_time: number;
  end_time: number;
  execution_order: number;
  serialized: {name: string; _self?: any};
  session_id: number;
  error?: string;
  type: RunType;
}

export interface LLMRun extends BaseRun {
  prompts: string[];
  response?: LLMResult;
}

export interface ChainRun extends BaseRun {
  inputs: ChainValues;
  outputs?: ChainValues;
  child_llm_runs: LLMRun[];
  child_chain_runs: ChainRun[];
  child_tool_runs: ToolRun[];
}

export interface ToolRun extends BaseRun {
  tool_input: string;
  output?: string;
  action: string;
  child_llm_runs: LLMRun[];
  child_chain_runs: ChainRun[];
  child_tool_runs: ToolRun[];
}

export abstract class BaseTracer extends BaseCallbackHandler {
  protected session?: TracerSession;

  protected stack: (LLMRun | ChainRun | ToolRun)[] = [];

  protected executionOrder = 1;

  protected constructor() {
    super();
    this.alwaysVerbose = true;
  }

  abstract loadSession(sessionName: string): Promise<TracerSession>;

  abstract loadDefaultSession(): Promise<TracerSession>;

  protected abstract persistRun(
    run: LLMRun | ChainRun | ToolRun
  ): Promise<void>;

  protected abstract persistSession(
    session: TracerSessionCreate
  ): Promise<TracerSession>;

  async newSession(sessionName?: string): Promise<TracerSession> {
    const sessionCreate: TracerSessionCreate = {
      start_time: Date.now(),
      name: sessionName,
    };
    const session = await this.persistSession(sessionCreate);
    this.session = session;
    return session;
  }

  protected _addChildRun(
    parentRun: ChainRun | ToolRun,
    childRun: LLMRun | ChainRun | ToolRun
  ) {
    if (childRun.type === 'llm') {
      parentRun.child_llm_runs.push(childRun as LLMRun);
    } else if (childRun.type === 'chain') {
      parentRun.child_chain_runs.push(childRun as ChainRun);
    } else if (childRun.type === 'tool') {
      parentRun.child_tool_runs.push(childRun as ToolRun);
    } else {
      throw new Error('Invalid run type');
    }
  }

  protected _startTrace(run: LLMRun | ChainRun | ToolRun) {
    this.executionOrder += 1;

    if (this.stack.length > 0) {
      if (
        !(
          this.stack.at(-1)?.type === 'tool' ||
          this.stack.at(-1)?.type === 'chain'
        )
      ) {
        throw new Error('Nested run can only be logged for tool or chain');
      }
      const parentRun = this.stack.at(-1) as ChainRun | ToolRun;
      this._addChildRun(parentRun, run);
    }
    this.stack.push(run);
  }

  protected async _endTrace() {
    const run = this.stack.pop();
    if (this.stack.length === 0 && run) {
      this.executionOrder = 1;
      await this.persistRun(run);
    }
  }

  async handleLLMStart(
    llm: {name: string},
    prompts: string[],
    _verbose?: boolean
  ): Promise<void> {
    if (this.session === undefined) {
      this.session = await this.loadDefaultSession();
    }
    const run: LLMRun = {
      start_time: Date.now(),
      end_time: 0,
      serialized: llm,
      prompts,
      session_id: this.session.id,
      execution_order: this.executionOrder,
      type: 'llm',
    };

    this._startTrace(run);
  }

  async handleLLMEnd(output: LLMResult, _verbose?: boolean): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'llm') {
      throw new Error('No LLM run to end.');
    }
    const run = this.stack.at(-1) as LLMRun;
    run.end_time = Date.now();
    run.response = output;
    await this._endTrace();
  }

  async handleLLMError(error: Error, _verbose?: boolean): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'llm') {
      throw new Error('No LLM run to end.');
    }
    const run = this.stack.at(-1) as LLMRun;
    run.end_time = Date.now();
    run.error = error.message;
    await this._endTrace();
  }

  async handleChainStart(
    chain: {name: string},
    inputs: ChainValues,
    _verbose?: boolean
  ): Promise<void> {
    if (this.session === undefined) {
      this.session = await this.loadDefaultSession();
    }
    const run: ChainRun = {
      start_time: Date.now(),
      end_time: 0,
      serialized: chain,
      inputs,
      session_id: this.session.id,
      execution_order: this.executionOrder,
      type: 'chain',
      child_llm_runs: [],
      child_chain_runs: [],
      child_tool_runs: [],
    };

    this._startTrace(run);
  }

  async handleChainEnd(
    outputs: ChainValues,
    _verbose?: boolean
  ): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'chain') {
      throw new Error('No chain run to end.');
    }
    const run = this.stack.at(-1) as ChainRun;
    run.end_time = Date.now();
    run.outputs = outputs;
    await this._endTrace();
  }

  async handleChainError(error: Error, _verbose?: boolean): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'chain') {
      throw new Error('No chain run to end.');
    }
    const run = this.stack.at(-1) as ChainRun;
    run.end_time = Date.now();
    run.error = error.message;
    await this._endTrace();
  }

  async handleToolStart(
    tool: {name: string},
    input: string,
    _verbose?: boolean
  ): Promise<void> {
    if (this.session === undefined) {
      this.session = await this.loadDefaultSession();
    }
    const run: ToolRun = {
      start_time: Date.now(),
      end_time: 0,
      serialized: tool,
      tool_input: input,
      session_id: this.session.id,
      execution_order: this.executionOrder,
      type: 'tool',
      action: JSON.stringify(tool), // TODO: this is duplicate info, not needed
      child_llm_runs: [],
      child_chain_runs: [],
      child_tool_runs: [],
    };

    this._startTrace(run);
  }

  async handleToolEnd(output: string, _verbose?: boolean): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'tool') {
      throw new Error('No tool run to end');
    }
    const run = this.stack.at(-1) as ToolRun;
    run.end_time = Date.now();
    run.output = output;
    await this._endTrace();
  }

  async handleToolError(error: Error, _verbose?: boolean): Promise<void> {
    if (this.stack.length === 0 || this.stack.at(-1)?.type !== 'tool') {
      throw new Error('No tool run to end.');
    }
    const run = this.stack.at(-1) as ToolRun;
    run.end_time = Date.now();
    run.error = error.message;
    await this._endTrace();
  }
}
