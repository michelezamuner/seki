import Index from './drivers/index.js';
import DomainService from './domain/service.js';
import ApplicationService from './application/service.js';
import Controller from './application/controller.js';
import Api from './clients/api.js';

export default class Provider {
  provide(api) {
    const index = new Index();
    const domainService = new DomainService();
    const applicationService = new ApplicationService(index, domainService);
    const controller = new Controller(applicationService);

    const apiClient = new Api(controller);
    api.register('search', apiClient);
  }
}
