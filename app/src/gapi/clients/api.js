export default class Api {
  constructor(service) {
    this._service = service;
  }

  routes() {
    return {
      login: async() => await this._login(),
      sheets: async(r) => await this._sheets(r),
    };
  }

  async _login() {
    return await this._call(async() =>
      await this._service.login()
    );
  }

  async _sheets(request) {
    return await this._call(async() => ({
      values: await this._service.sheets(request.sheetId, request.range),
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
