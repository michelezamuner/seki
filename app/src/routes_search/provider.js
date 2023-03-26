import AuthDriver from './drivers/auth_driver.js';
import RoutesIndex from './drivers/routes_index.js';
import DomainService from './domain/service.js';
import ApplicationService from './application/service.js';
import Controller from './application/controller.js';
import Api from './clients/api.js';
import Listener from './clients/listener.js';

export default class Provider {
  provide(api, dispatcher) {
    const authDriver = new AuthDriver(api);
    const routesIndex = new RoutesIndex();
    const domainService = new DomainService();
    const applicationService = new ApplicationService(routesIndex, domainService);
    const controller = new Controller(authDriver, applicationService);

    const apiClient = new Api(controller);
    api.register('routes_search', apiClient);

    const listenerClient = new Listener(controller);
    dispatcher.register('routes_repository', listenerClient);
  }
}
