interface RetryOptions {
  maxTries: number;
  afterEachError?: (e: unknown) => void;
  afterLastError?: (e: unknown) => void;
}

let tries = 0;

export const retry = (fn: () => void, options: RetryOptions) => {
  try {
    tries = tries + 1;
    fn();
    tries = 0;
  } catch (e) {
    if (options.afterEachError) {
      options.afterEachError(e);
    }
    if (tries < options.maxTries) {
      retry(fn, options);
    } else {
      if (options.afterLastError) {
        options.afterLastError(e);
      }
    }
  }
};

export const retryAsync = async (fn: () => Promise<void>, options: RetryOptions) => {
  try {
    tries = tries + 1;
    await fn();
    tries = 0;
  } catch (e) {
    if (options.afterEachError) {
      options.afterEachError(e);
    }
    if (tries < options.maxTries) {
      await retryAsync(fn, options);
    } else {
      if (options.afterLastError) {
        options.afterLastError(e);
      }
    }
  }
};
