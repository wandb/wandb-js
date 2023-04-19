import {Media} from './media.js';
import {Run} from '../wandb_run.js';

/* TODO: figure out how to do in browser too
function hashId(s: string): string {
  return crypto.createHash('md5').update(s, 'utf8').digest('hex').slice(0, 16);
}
*/

interface Result {
  inputs: Record<string, unknown> | null;
  outputs: Record<string, unknown> | null;
}

interface Span {
  span_id: string | null;
  name: string | null;
  start_time_ms: number | null;
  end_time_ms: number | null;
  status_code: StatusCode | null;
  status_message: string | null;
  attributes: Record<string, unknown> | null;
  results: Result[] | null;
  child_spans: Span[] | null;
  span_kind: SpanKind | null;
}

export enum StatusCode {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum SpanKind {
  LLM = 'LLM',
  CHAIN = 'CHAIN',
  AGENT = 'AGENT',
  TOOL = 'TOOL',
}

export class WBTraceTree extends Media {
  private static _log_type = 'wb_trace_tree';

  private _root_span: Span;

  private _model_dict: Record<string, unknown> | null;

  constructor(
    root_span: Span,
    model_dict: Record<string, unknown> | null = null
  ) {
    super();
    this._root_span = root_span;
    this._model_dict = model_dict;
  }

  static getMediaSubdir(): string {
    // TODO: windows paths / this isn't used currently
    return 'media/wb_trace_tree';
  }

  toJSON(_?: Run): Record<string, unknown> {
    const res: Record<string, unknown> = {};
    res._type = WBTraceTree._log_type;
    // Here we use `JSON.stringify` to put things into string format. This is because
    // the complex data structures create problems for gorilla history to parquet.
    if (this._model_dict != null) {
      const model_dump_str = JSON.stringify(this._model_dict);
      // res.model_hash = hashId(model_dump_str);
      res.model_dict_dumps = model_dump_str;
    }
    res.root_span_dumps = JSON.stringify(this._root_span);
    return res;
  }

  isBound(): boolean {
    return true;
  }
}

export function addAttribute(span: Span, key: string, value: unknown): void {
  /* eslint-disable no-param-reassign */
  if (span.attributes === null) {
    span.attributes = {};
  }
  span.attributes[key] = value;
}

export function addNamedResult(
  span: Span,
  inputs: Record<string, unknown>,
  outputs: Record<string, unknown>
): void {
  if (span.results === null) {
    span.results = [];
  }
  span.results.push({inputs, outputs});
}

export function addChildSpan(span: Span, childSpan: Span): void {
  if (span.child_spans === null) {
    span.child_spans = [];
  }
  span.child_spans.push(childSpan);
}
