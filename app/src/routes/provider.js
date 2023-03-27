import RoutesRepository from './drivers/routes_repository.js';
import Service from './application/service.js';
import Web from './clients/web.js';
import Console from './clients/console.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api, dispatcher) {
    const routesRepository = new RoutesRepository(api);
    const service = new Service(routesRepository);
    const consoleClient = new Console(window, service);
    const webClient = new Web(window, service, this._config.ui);

    dispatcher.register(consoleClient);
    dispatcher.register(webClient);
  }
}
