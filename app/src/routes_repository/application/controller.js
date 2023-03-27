export default class Controller {
  constructor(authDriver, service) {
    this._authDriver = authDriver;
    this._service = service;
  }

  async update(request) {
    const user = await this._authDriver.auth(request.authToken);

    await this._service.update(user);
  }

  async routes(request) {
    const user = await this._authDriver.auth(request.authToken);

    return await this._service.routes(user);
  }
}
