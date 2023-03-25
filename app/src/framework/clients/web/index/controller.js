export default class Controller {
  constructor(service) {
    this._service = service;
  }

  register(dispatcher) {
    dispatcher.listener('start', async event => await this._index(event));
  }

  async _index(event) {
    await this._service.exec(event.authContext);
  }
}
