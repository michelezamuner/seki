export default class Api {
  constructor(controller) {
    this._controller = controller;
  }

  routes() {
    return {
      get: {
        search: async(r) => await this._search(r),
      },
      post: {
        add: async(r) => await this._add(r),
      },
      delete: {
        reset: async() => await this._reset(),
      },
    };
  }

  async _reset() {
    return await this._call(async() =>
      await this._controller.reset()
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
