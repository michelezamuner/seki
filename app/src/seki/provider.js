import Gapi from './drivers/gapi.js';
import Service from './application/service.js';
import Web from './clients/web.js';
import Console from './clients/console.js';

export default class Provider {
  constructor() {
  }

  provide(api, dispatcher) {
    const gapiDriver = new Gapi(api);
    const service = new Service(gapiDriver);

    const webClient = new Web(dispatcher, service);
    dispatcher.register(webClient);

    const consoleClient = new Console(window, service);
    dispatcher.register(consoleClient);
  }
}
