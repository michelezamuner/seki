export default class Api {
  constructor() {
    this._controllers = {};
  }

  register(service, client) {
    if (!this._controllers[service]) {
      this._controllers[service] = {};
    }
    for (const [path, controller] of Object.entries(client.routes())) {
      this._controllers[service][path] = controller;
    }
  }

  async get(address, request) {
    const url = this._url(address);

    if (url.protocol === 'app') {
      const controller = this._controllers[url.host][url.path];
      return new Promise(resolve => resolve(controller(request)));
    }
  }

  _url(address) {
    const match = address.match(/(.*):\/\/([^/]*)\/(.*)/);

    return { protocol: match[1], host: match[2], path: match[3] };
  }
}
