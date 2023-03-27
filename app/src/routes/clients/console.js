export default class Console {
  constructor(context, service) {
    this._context = context;
    this._service = service;
  }

  listeners() {
    return {
      'seki.inited': () => this._onLoad(),
    };
  }

  _onLoad() {
    this._context.seki = {
      login: async() => await this._login(),
      index: async() => await this._index(),
      search: async(query) => await this._search(query),
      update: async() => await this._update(),
    };
  }

  async _login() {
    this._write('Wait...');

    this._user = await this._service.login();

    this._write('...done!');
  }

  async _index() {
    this._write('Wait...');

    const routes = await this._service.index();
    this._displayRoutes(routes);

    this._write('...done!');
  }

  async _search(query) {
    this._write('Wait...');

    const routes = await this._service.search(query);
    console.log(routes);
    // @todo
    // this._displayRoutes(routes);

    this._write('...done!');
  }

  async _update() {
    this._write('Wait...');

    await this._service.update();

    this._write('...done!');
  }

  _displayRoutes(routes) {
    for (const route of routes) {
      this._write(`[${route.id}] ${route.name}`);
    }
  }

  _write(message) {
    this._context.console.info(message);
  }
}
