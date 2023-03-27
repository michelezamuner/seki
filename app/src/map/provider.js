import Web from './clients/web.js';

export default class Provider {
  constructor(config) {
    this._config = config.map;
  }

  provide(api, dispatcher) {
    const webClient = new Web(window, dispatcher, this._config);
    dispatcher.register(webClient);
  }
}
