import AuthDriver from './drivers/auth_driver.js';
import DataDriver from './drivers/data_driver.js';
import RoutesRepository from './drivers/routes_repository.js';
import Service from './application/service.js';
import Controller from './application/controller.js';
import Api from './clients/api.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api, dispatcher) {
    const authDriver = new AuthDriver(api);
    const dataDriver = new DataDriver(this._config.db);
    const routesRepository = new RoutesRepository();

    const service = new Service(dataDriver, routesRepository, dispatcher);
    const controller = new Controller(authDriver, service);

    const apiClient = new Api(controller);
    api.register('routes_repository', apiClient);
  }
}
