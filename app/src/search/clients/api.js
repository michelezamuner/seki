export default class Api {
  constructor(controller) {
    this._controller = controller;
  }

  routes() {
    return {
      reset: async(r) => await this._reset(r),
      add: async(r) => await this._add(r),
      search: async(r) => await this._search(r),
    };
  }

  async _reset(request) {
    return await this._call(async() =>
      await this._controller.reset(request)
    );
  }

  async _add(request) {
    return await this._call(async() =>
      await this._controller.add(request)
    );
  }

  async _search(request) {
    return await this._call(async() => ({
      values: await this._controller.search(request),
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
