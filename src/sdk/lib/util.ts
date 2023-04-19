import {config} from './config.js';

export function isNode(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node != null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debugLog(...args: any[]) {
  if (config().DEBUG) {
    console.log(...args);
  }
}
