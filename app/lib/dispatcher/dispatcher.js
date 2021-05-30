export const Dispatcher = {
  _listeners: [],
  _dispatched: {},
  dispatch: function (eventName, data) {
    this._dispatched[eventName] = data;
    for (const listener of this._listeners) {
      if (!this._ready(eventName, listener.deps)) {
        continue;
      }
      setTimeout(() => {
        if (typeof listener.callback !== 'function') {
          throw new Error(`Invalid listener for event ${eventName}: ${listener.callback}`);
        }
        listener.callback(...listener.deps.map(dep => this._dispatched[dep]));
      });
    }
  },
  register: function (eventsNames, listener) {
    this._listeners.push({
      deps: Array.isArray(eventsNames) ? eventsNames : [eventsNames],
      callback: listener
    });
  },
  _ready: function (currentEvent, deps) {
    if (!deps.includes(currentEvent)) {
      return false;
    }
    for (const eventName of deps) {
      if (this._dispatched[eventName] === undefined) {
        return false;
      }
    }

    return true;
  }
};
