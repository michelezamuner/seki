import GapiDriver from './drivers/gapi_driver.js';
import RoutesRepository from './drivers/routes_repository.js';
import Service from './application/service.js';
import Controller from './application/controller.js';
import Api from './clients/api.js';

export default class Provider {
  constructor(config) {
    this._config = config.routes_repository;
  }

  provide(api, dispatcher) {
    const gapiDriver = new GapiDriver(api, this._config);
    const routesRepository = new RoutesRepository();

    const service = new Service(gapiDriver, routesRepository, dispatcher);
    const controller = new Controller(service);

    const apiClient = new Api(controller);
    api.register('routes_repository', apiClient);
  }
}
