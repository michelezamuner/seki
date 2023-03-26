export default class Api {
  constructor(controller) {
    this._controller = controller;
  }

  routes() {
    return {
      update: async(r) => await this._update(r),
      routes: async(r) => await this._routes(r),
    };
  }

  async _update(request) {
    return await this._call(async() =>
      await this._controller.update(request)
    );
  }

  async _routes(request) {
    return await this._call(async() => ({
      routes: await this._controller.routes(request),
    }));
  }

  async _call(resolve, request) {
    try {
      return { status: 'ok', data: await resolve(request) };
    } catch (e) {
      return { status: 'error', data: { reason: e } };
    }
  }
}
