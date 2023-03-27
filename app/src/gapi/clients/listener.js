export default class Listener {
  constructor(service) {
    this._service = service;
  }

  listeners() {
    return {
      DOMContentLoaded: () => this._onLoad(),
      'gapi.gapi_loaded': async() => await this._onGapiLoaded(),
      'gapi.gsi_loaded': async() => await this._onGsiLoaded(),
    };
  }

  _onLoad() {
    this._service.load();
  }

  async _onGapiLoaded() {
    await this._service.initGapi();
  }

  async _onGsiLoaded() {
    await this._service.initGsi();
  }
}
