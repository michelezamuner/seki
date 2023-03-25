export default class Dispatcher {
  constructor(nativeDispatcher, eventFactory) {
    this._nativeDispatcher = nativeDispatcher;
    this._eventFactory = eventFactory;
    this._middleware = [];
  }

  middleware(middleware) {
    this._middleware.push(middleware);
  }

  listener(eventName, listener) {
    this._nativeDispatcher.addEventListener(eventName, async e => {
      let event = this._eventFactory.fromNativeEvent(e);
      for (const middleware of this._middleware) {
        event = await middleware.handle(event);
      }
      await listener(event);
    }
    );
  }

  async dispatch(eventName, event) {
    const nativeEvent = this._eventFactory.toNativeEvent(eventName, event);
    this._nativeDispatcher.dispatchEvent(nativeEvent);
  }
}
