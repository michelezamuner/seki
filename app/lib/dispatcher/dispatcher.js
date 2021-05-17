/* global document */
export const Dispatcher = {
  dispatch: function (eventName, data) {
    const event = data
      ? new CustomEvent(eventName, { detail: data })
      : new Event(eventName);
    document.dispatchEvent(event);
  },
  register: function (eventName, listener) {
    document.addEventListener(eventName, event => {
      if (typeof event.detail === 'function') {
        event.detail(listener);
      } else {
        listener(event.detail);
      }
    });
  },
  registerAsync: function (eventName, listener) {
    document.addEventListener(eventName, event => {
      setTimeout(() => {
        listener(event.detail);
      }, 0);
    });
  }
};
