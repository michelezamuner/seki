export default class Console {
  constructor(context, service) {
    this._context = context;
    this._service = service;
    this._authToken = null;
  }

  run() {
    this._context.seki = {
      login: async() => await this._login(),
      index: async() => await this._index(),
      search: async(query) => await this._search(query),
      update: async() => await this._update(),
    };
  }

  async _login() {
    if (this._authToken) {
      this._write('You are already logged in');

      return;
    }

    this._write('Wait...');

    this._authToken = await this._service.login();

    this._write('...done!');
  }

  async _index() {
    if (!this._authToken) {
      this._write('You are not logged in');

      return;
    }

    this._write('Wait...');

    const routes = await this._service.index(this._authToken);
    this._displayRoutes(routes);

    this._write('...done!');
  }

  async _search(query) {
    if (!this._authToken) {
      this._write('You are not logged in');

      return;
    }

    this._write('Wait...');

    const routes = await this._service.search(this._authToken, query);
    console.log(routes);
    // @todo
    // this._displayRoutes(routes);

    this._write('...done!');
  }

  async _update() {
    if (!this._authToken) {
      this._write('You are not logged in');

      return;
    }

    this._write('Wait...');

    await this._service.update(this._authToken);

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
