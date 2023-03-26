export default class Api {
  constructor(controller) {
    this._controller = controller;
  }

  routes() {
    return {
      search: async(r) => await this._search(r),
    };
  }

  async _search(request) {
    return await this._call(async() => ({
      routes: await this._controller.search(request),
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
