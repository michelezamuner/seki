export default class Console {
  constructor(runtime, dispatcher, service) {
    this._runtime = runtime;
    this._dispatcher = dispatcher;
    this._service = service;
  }

  listeners() {
    return {
      'gapi.inited': () => this._onGapiInited(),
    };
  }

  _onGapiInited() {
    this._runtime.seki = {
      login: async() => await this._login(),
    };

    this._dispatcher.dispatch('seki.console.loaded');
  }

  async _login() {
    this._write('Wait...');

    this._user = await this._service.login();

    this._write('...done!');
  }

  _write(message) {
    this._runtime.console.info(message);
  }
}
