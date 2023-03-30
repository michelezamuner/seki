export default class Dispatcher {
  constructor(nativeDispatcher, eventFactory) {
    this._defaultTarget = nativeDispatcher;
    this._eventFactory = eventFactory;
  }

  register(client) {
    for (const [eventName, listener] of Object.entries(client.listeners())) {
      if (Array.isArray(listener)) {
        this._addListener(eventName, listener[0], listener[1]);
      } else {
        this._addListener(eventName, listener);
      }
    }
  }

  async dispatch(eventName, event) {
    const nativeEvent = this._eventFactory.toNativeEvent(eventName, event);
    this._defaultTarget.dispatchEvent(nativeEvent);
  }

  _addListener(eventName, listener, target = this._defaultTarget) {
    target.addEventListener(eventName, async e => {
      let event = this._eventFactory.fromNativeEvent(e);
      await listener(event);
    });
  }
}
