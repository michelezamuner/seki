export default class Console {
  constructor(runtime, service) {
    this._runtime = runtime;
    this._service = service;
  }

  listeners() {
    return {
      'seki.console.loaded': async() => await this._onSekiLoaded(),
    };
  }

  _onSekiLoaded() {
    this._runtime.seki = this._runtime.seki || {};
    this._runtime.seki.search = async(query) => await this._search(query);
  }

  async _search(query) {
    this._write('Wait...');

    const routes = await this._service.search(query);
    console.log(routes);

    this._write('...done!');
  }

  _write(message) {
    this._runtime.console.info(message);
  }
}
