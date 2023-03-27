import Gapi from './drivers/gapi.js';
import Service from './application/service.js';
import Web from './clients/web.js';
import Console from './clients/console.js';

export default class Provider {
  constructor(config) {
    this._config = config.seki;
  }

  provide(api, dispatcher) {
    const gapiDriver = new Gapi(api);
    const service = new Service(gapiDriver);

    const webClient = new Web(dispatcher, service);
    if (this._config.clients.web) {
      dispatcher.register(webClient);
    }

    const consoleClient = new Console(window, dispatcher, service);
    if (this._config.clients.console) {
      dispatcher.register(consoleClient);
    }
  }
}
