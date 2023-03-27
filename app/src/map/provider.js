import Web from './clients/web.js';

export default class Provider {
  constructor(config) {
    this._config = config;
  }

  provide(api, dispatcher) {
    const webClient = new Web(window, dispatcher, this._config.ui);
    dispatcher.register(webClient);
  }
}
