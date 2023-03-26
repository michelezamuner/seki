export default class Api {
  constructor(service) {
    this._service = service;
  }

  routes() {
    return {
      auth: async() => await this._auth(),
      context: async(r) => await this._context(r),
    };
  }

  async _auth() {
    return await this._call(async() => ({
      authToken: await this._service.auth(),
    }));
  }

  async _context(request) {
    return await this._call(async() => ({
      authContext: await this._service.context(request.authToken),
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
