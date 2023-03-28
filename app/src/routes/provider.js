import GapiDriver from './drivers/gapi_driver.js';
import RoutesRepository from './drivers/routes_repository.js';
import Service from './application/service.js';
import Web from './clients/web.js';
import Console from './clients/console.js';

export default class Provider {
  constructor(config) {
    this._config = config.routes;
  }

  provide(api, dispatcher) {
    const dataDriver = new GapiDriver(api, this._config);
    const routesRepository = new RoutesRepository();
    const service = new Service(dataDriver, routesRepository, dispatcher);
    const consoleClient = new Console(window, service);
    const webClient = new Web(window, service);

    dispatcher.register(consoleClient);
    dispatcher.register(webClient);
  }
}
