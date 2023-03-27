export default class Console {
  constructor(runtime, service) {
    this._runtime = runtime;
    this._service = service;
  }

  listeners() {
    return {
      'seki.loaded': () => this._onSekiLoaded(),
    };
  }

  _onSekiLoaded() {
    this._runtime.seki = this._runtime.seki || {};
    this._runtime.seki.login = async() => await this._login();
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
