export default class Controller {
  constructor(load) {
    this._load = load;
  }

  async load(request) {
    await this._load.exec(request.authContext);
  }
}
