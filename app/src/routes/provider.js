import GapiDriver from './drivers/gapi_driver.js';
import RoutesRepository from './drivers/routes_repository.js';
import RoutesSearch from './drivers/routes_search.js';
import Service from './application/service.js';
import Web from './clients/web.js';
import Console from './clients/console.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api, dispatcher) {
    const gapiDriver = new GapiDriver(api);
    const routesRepository = new RoutesRepository(api);
    const routesSearch = new RoutesSearch(api);
    const service = new Service(gapiDriver, routesRepository, routesSearch);
    const consoleClient = new Console(window, service);
    const webClient = new Web(document, window.L, this._config.ui, service);

    dispatcher.register(consoleClient);
    dispatcher.register(webClient);
  }
}
