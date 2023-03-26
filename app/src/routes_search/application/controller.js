export default class Controller {
  constructor(authDriver, service) {
    this._authDriver = authDriver;
    this._service = service;
  }

  lockIndex() {
    this._service.lockIndex();
  }

  updateIndex(request) {
    this._service.updateIndex(request.route);
  }

  unlockIndex() {
    this._service.unlockIndex();
  }

  async search(request) {
    // @todo: validate request.authToken

    return await this._service.search(request.query);
  }
}
