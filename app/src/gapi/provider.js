import Browser from './drivers/browser.js';
import Service from './application/service.js';
import Api from './clients/api.js';
import Listener from './clients/listener.js';

export default class Provider {
  constructor(config) {
    this._config = config.gapi;
  }

  provide(api, dispatcher) {
    const browser = new Browser(window, dispatcher);
    const service = new Service(browser, dispatcher, this._config);

    const apiClient = new Api(service);
    api.register('gapi', apiClient);

    const listenerClient = new Listener(service);
    dispatcher.register(listenerClient);
  }
}
