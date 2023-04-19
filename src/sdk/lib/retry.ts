export class Delay {
  ms: number;

  reject: ((reason: string) => void) | null = null;

  timer: NodeJS.Timeout | null = null;

  constructor(ms: number) {
    this.ms = ms;
  }

  wait(ms?: number) {
    return new Promise((resolve, reject) => {
      this.timer = setTimeout(resolve, ms || this.ms);
      this.reject = reject;
    }).catch(e => {
      if (e === 'cancelled') {
        return null;
      }
      throw e;
    });
  }

  cancel(): boolean {
    if (this.timer && this.reject) {
      this.reject('cancelled');
      clearTimeout(this.timer);
      return true;
    }
    return false;
  }
}

export const requestWithRetry = async function (
  requestPromise: Promise<any>,
  {maxAttempts = 3, maxDelayMs = 15_000, retriesDelay = 1_000} = {},
  retriesCount = 0
): Promise<any> {
  // TODO: wire up settings.silent?
  /* eslint-disable no-param-reassign */
  try {
    return await requestPromise;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.response && e.response.status) {
      if (e.response.status <= 404) {
        console.error(`Fatal HTTP error (${e.response.status}): `, e);
        return null;
      }
    } else {
      console.error('Fatal error: ', e);
      return null;
    }
    retriesCount += 1;
    if (retriesCount > maxAttempts) {
      console.error(`Max retries (${maxAttempts}) reached. Giving up.`);
      return null;
    }
    const backoffFactor = Math.random() + 1.5;
    if (retriesDelay * backoffFactor < maxDelayMs) {
      retriesDelay *= backoffFactor;
    }
    console.log(`Retrying failed request to W&B in ${retriesDelay}ms...`);
    await new Delay(retriesDelay).wait();
    return await requestWithRetry(
      requestPromise,
      {maxAttempts, maxDelayMs, retriesDelay},
      retriesCount
    );
  }
};
