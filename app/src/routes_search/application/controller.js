export default class Controller {
  constructor(service) {
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
}
