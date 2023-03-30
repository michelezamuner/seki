export default class Api {
  constructor(service) {
    this._service = service;
  }

  routes() {
    return {
      get: {
        sheets: async(r) => await this._getSheets(r),
      },
      post: {
        login: async() => await this._login(),
        sheets: async(r) => await this._postSheets(r),
      },
    };
  }

  async _login() {
    return await this._call(async() =>
      await this._service.login()
    );
  }

  async _getSheets(request) {
    return await this._call(async() => ({
      values: await this._service.getSheets(request.sheetId, request.range),
    }));
  }

  async _postSheets(request) {
    return await this._call(async() =>
      await this._service.postSheets(request.sheetId, request.range, request.values)
    );
  }

  async _call(resolve, request) {
    try {
      return { status: 'ok', data: await resolve(request) };
    } catch (e) {
      return { status: 'error', data: { reason: e } };
    }
  }
}
