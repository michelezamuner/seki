export default class Api {
  constructor(service) {
    this._service = service;
  }

  routes() {
    return {
      login: async() => await this._login(),
    };
  }

  async _login() {
    return await this._call(async() =>
      await this._service.login()
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
