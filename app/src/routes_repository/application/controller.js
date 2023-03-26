export default class Controller {
  constructor(authDriver, service) {
    this._authDriver = authDriver;
    this._service = service;
  }

  async update(request) {
    const authContext = await this._authDriver.context(request.authToken);

    await this._service.update(authContext);
  }

  async routes(request) {
    const authContext = await this._authDriver.context(request.authToken);

    return await this._service.routes(authContext);
  }
}
