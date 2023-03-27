export default class Dispatcher {
  constructor(nativeDispatcher, eventFactory) {
    this._nativeDispatcher = nativeDispatcher;
    this._eventFactory = eventFactory;
  }

  register(client) {
    for (const [eventName, listener] of Object.entries(client.listeners())) {
      this._addListener(eventName, listener);
    }
  }

  async dispatch(eventName, event) {
    const nativeEvent = this._eventFactory.toNativeEvent(eventName, event);
    this._nativeDispatcher.dispatchEvent(nativeEvent);
  }

  _addListener(eventName, listener) {
    this._nativeDispatcher.addEventListener(eventName, async e => {
      let event = this._eventFactory.fromNativeEvent(e);
      await listener(event);
    });
  }
}
