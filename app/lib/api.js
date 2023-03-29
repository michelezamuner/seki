export default class Api {
  constructor() {
    this._controllers = {};
  }

  register(service, client) {
    if (!this._controllers[service]) {
      this._controllers[service] = {};
    }
    for (const [method, route] of Object.entries(client.routes())) {
      for (const [path, controller] of Object.entries(route)) {
        if (!this._controllers[service]) {
          this._controllers[service] = {};
        }
        if (!this._controllers[service][path]) {
          this._controllers[service][path] = {};
        }
        this._controllers[service][path][method] = controller;
      }
    }
  }

  get(address, request) {
    return this._call('get', address, request);
  }

  async post(address, request) {
    return this._call('post', address, request);
  }

  async delete(address) {
    return this._call('delete', address);
  }

  _call(method, address, request) {
    const url = this._url(address);
    if (url.protocol === 'app') {
      const controller = this._controllers[url.host][url.path][method];

      return new Promise(resolve => resolve(controller(request)));
    }
  }

  _url(address) {
    const match = address.match(/(.*):\/\/([^/]*)\/(.*)/);

    return { protocol: match[1], host: match[2], path: match[3] };
  }
}
