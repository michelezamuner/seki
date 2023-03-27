import RoutesIndex from './drivers/routes_index.js';
import DomainService from './domain/service.js';
import ApplicationService from './application/service.js';
import Controller from './application/controller.js';
import Console from './clients/console.js';
import Listener from './clients/listener.js';

export default class Provider {
  provide(api, dispatcher) {
    const routesIndex = new RoutesIndex();
    const domainService = new DomainService();
    const applicationService = new ApplicationService(routesIndex, domainService);
    const controller = new Controller(applicationService);

    const consoleClient = new Console(window, applicationService);
    dispatcher.register(consoleClient);

    const listenerClient = new Listener(controller);
    dispatcher.register(listenerClient);
  }
}
