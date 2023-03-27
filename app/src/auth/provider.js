// import Gapi from '../../lib/gapi.js';
import GapiDriver from './drivers/gapi_driver.js';
import Service from './application/service.js';
import Api from './clients/api.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api) {
    // const gapi = new Gapi(window, document, this._config.gapi);
    const gapiDriver = new GapiDriver(api);

    const service = new Service(gapiDriver);

    const apiClient = new Api(service);
    api.register('auth', apiClient);
  }
}
