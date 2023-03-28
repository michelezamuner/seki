export default class Console {
  constructor(runtime, service) {
    this._runtime = runtime;
    this._service = service;
  }

  listeners() {
    return {
      'seki.console.loaded': () => this._onSekiLoaded(),
    };
  }

  _onSekiLoaded() {
    this._runtime.seki.index = async() => await this._index();
    this._runtime.seki.update = async() => await this._update();
    this._runtime.seki.search = async(query) => await this._search(query);
  }

  async _index() {
    this._write('Wait...');

    const routes = await this._service.index();
    this._displayRoutes(routes);

    this._write('...done!');
  }

  async _update() {
    this._write('Wait...');

    await this._service.update();

    this._write('...done!');
  }

  async _search(query) {
    this._write('Wait...');

    const routes = await this._service.search(query);
    this._displayRoutes(routes);

    this._write('...done!');
  }

  _displayRoutes(routes) {
    for (const route of routes) {
      this._write(`[${route.id}] ${route.name}`);
    }
  }

  _write(message) {
    this._runtime.console.info(message);
  }
}
