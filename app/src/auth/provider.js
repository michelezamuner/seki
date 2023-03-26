import Gapi from '../../lib/gapi.js';
import AuthDriver from './drivers/auth_driver.js';
import AuthRepository from './drivers/auth_repository.js';
import AuthTokenFactory from './domain/auth_token_factory.js';
import Service from './application/service.js';
import Api from './clients/api.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api) {
    const gapi = new Gapi(window, document, this._config.gapi);
    const authDriver = new AuthDriver(gapi);
    const authTokenFactory = new AuthTokenFactory();
    const authRepository = new AuthRepository();

    const service = new Service(authDriver, authTokenFactory, authRepository);

    const apiClient = new Api(service);
    api.register('auth', apiClient);
  }
}
