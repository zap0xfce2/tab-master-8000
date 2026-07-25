import {browser} from 'webextension-polyfill-ts';

export const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendMsg = async (msg: Partial<BgMessage>): Promise<any> => {
  let response;

  console.log(`Sending message: `, msg);

  try {
    response = await browser.runtime.sendMessage(chrome.runtime.id, msg);
  } catch (e) {
    return null;
  }

  return response;
};

export const sendLog = async (...args: any[]) => {
  if (process.env.NODE_ENV === 'production') return;

  console.log(...args);

  await sendMsg({type: 'log', args});
}

export const sendError = async (err: Error) => {
  if (!err) return;

  if (process.env.NODE_ENV === 'production') return;

  console.error(err);

  await sendMsg({type: 'error', e: {
    message: err.message,
    stack: err.stack || new Error().stack,
  }});
}

export const chromeHandler = (handler) => {
  return async (...args) => {
    if (chrome.runtime.lastError) {
      await sendError(new Error(chrome.runtime.lastError.message));
    }

    try {
      return await handler(...args);
    } catch (e) {
      await sendError(e);
    }
  }
}

// lodash's debounce only debounces a single call site; this debounces independently per key
// (e.g. windowId), so activity in one window doesn't reset or block the timer of another.
export const keyedDebounce = <K>(fn: (key: K) => void, wait: number): (key: K) => void => {
  const timers = new Map<K, ReturnType<typeof setTimeout>>();

  return (key: K) => {
    clearTimeout(timers.get(key));
    timers.set(key, setTimeout(() => {
      timers.delete(key);
      fn(key);
    }, wait));
  };
};

// OffscreenCanvas has no toDataURL(), and FileReader isn't reliably available in a service
// worker, so blob -> data URL goes through btoa() instead. Chunked to avoid blowing the call
// stack via String.fromCharCode(...bytes) on larger arrays.
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 8192;
  let binary = '';

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
};