export default class Controller {
  constructor(service) {
    this._service = service;
  }

  async update() {
    await this._service.update();
  }

  async routes() {
    return await this._service.routes();
  }
}
