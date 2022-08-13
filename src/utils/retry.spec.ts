import { retry, retryAsync } from './retry';

describe('retry', () => {
  it('should not retry on no error', () => {
    const fn = jest.fn();
    retry(fn, { maxTries: 3 });
    expect(fn).toBeCalledTimes(1);
  });

  it('should try 3 times', () => {
    const mock = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error();
      })
      .mockImplementationOnce(() => {
        throw Error();
      })
      .mockImplementationOnce(null);
    retry(mock, { maxTries: 3 });
    expect(mock).toBeCalledTimes(3);
  });

  it('should execute function after each error', () => {
    const error = new Error();
    const mock = jest
      .fn()
      .mockImplementationOnce(() => {
        throw error;
      })
      .mockImplementationOnce(() => {
        throw error;
      })
      .mockImplementationOnce(null);
    const mockAfterEachError = jest.fn();
    retry(mock, { maxTries: 3, afterEachError: mockAfterEachError });
    expect(mock).toBeCalledTimes(3);
    expect(mockAfterEachError).toBeCalledTimes(2);
    expect(mockAfterEachError).toBeCalledWith(error);
  });

  it('should execute function after last error', () => {
    const error = new Error('retryError');
    const mockFn = jest.fn().mockImplementation(() => {
      throw error;
    });
    const mockAfterLastError = jest.fn();
    retry(mockFn, {
      maxTries: 3,
      afterLastError: mockAfterLastError,
    });
    expect(mockFn).toBeCalledTimes(3);
    expect(mockAfterLastError).toBeCalledTimes(1);
    expect(mockAfterLastError).toBeCalledWith(error);
  });
});

describe('retryAsync', () => {
  it('should not retry on no error', async () => {
    const fn = jest.fn();
    await retryAsync(fn, { maxTries: 3 });
    expect(fn).toBeCalledTimes(1);
  });

  it('should try 3 times', async () => {
    const mock = jest
      .fn()
      .mockImplementationOnce(() => {
        throw Error();
      })
      .mockImplementationOnce(() => {
        throw Error();
      })
      .mockImplementationOnce(null);
    await retryAsync(mock, { maxTries: 3 });
    expect(mock).toBeCalledTimes(3);
  });

  it('should execute function after each error', async () => {
    const error = new Error();
    const mock = jest
      .fn()
      .mockImplementationOnce(() => {
        throw error;
      })
      .mockImplementationOnce(() => {
        throw error;
      })
      .mockImplementationOnce(null);
    const mockAfterEachError = jest.fn();
    await retryAsync(mock, { maxTries: 3, afterEachError: mockAfterEachError });
    expect(mock).toBeCalledTimes(3);
    expect(mockAfterEachError).toBeCalledTimes(2);
    expect(mockAfterEachError).toBeCalledWith(error);
  });

  it('should execute function after last error', async () => {
    const error = new Error('retryError');
    const mockFn = jest.fn().mockImplementation(() => {
      throw error;
    });
    const mockAfterLastError = jest.fn();
    await retryAsync(mockFn, {
      maxTries: 3,
      afterLastError: mockAfterLastError,
    });
    expect(mockFn).toBeCalledTimes(3);
    expect(mockAfterLastError).toBeCalledTimes(1);
    expect(mockAfterLastError).toBeCalledWith(error);
  });
});
