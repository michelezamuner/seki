export default class Controller {
  constructor(service) {
    this._service = service;
  }

  async reset() {
    await this._service.reset();
  }

  async add(request) {
    await this._service.add(request.value);
  }

  async search(request) {
    return await this._service.search(request.query);
  }
}
