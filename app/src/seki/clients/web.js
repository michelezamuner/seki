export default class Web {
  constructor(dispatcher, service) {
    this._dispatcher = dispatcher;
    this._service = service;
  }

  listeners() {
    return {
      'gapi.inited': async() => await this._onGapiInited(),
    };
  }

  async _onGapiInited() {
    await this._service.login();
    this._dispatcher.dispatch('seki.loaded');
  }
}
