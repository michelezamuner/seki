/* global document, window, alert */
export const Dom = {
  addEventListener: function (eventName, listener) {
    document.addEventListener(eventName, event => {
      listener(event.detail);
    });
  },
  dispatchEvent: function (eventName, data) {
    const event = data
      ? new CustomEvent(eventName, { detail: data })
      : new Event(eventName);
    document.dispatchEvent(event);
  },
  keyCallback: function (key) {
    return callback => {
      return e => {
        e = e || window.event;
        if (e.key === key) {
          callback();
        }
      };
    };
  },
  onKeyDown: function (callback) {
    document.onkeydown = callback;
  },
  getElementById: function (id) {
    return document.getElementById(id);
  },
  createElement: function (name) {
    return document.createElement(name);
  },
  appendToBody: function (element) {
    document.body.appendChild(element);
  },
  alert: function (message) {
    alert(message);
  }
};
