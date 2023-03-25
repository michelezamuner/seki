export default class Controller {
  constructor(service) {
    this._service = service;
  }

  async index(request) {
    await this._service.exec(request.authContext);
  }
}
