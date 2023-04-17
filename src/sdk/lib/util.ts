export function isNode(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node != null
  );
}

export function debugLog(...args: any[]) {
  if (process.env.WANDB_DEBUG === 'true') {
    console.log(...args);
  }
}
