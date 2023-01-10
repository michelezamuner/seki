export default class Controller {
  constructor(load) {
    this._load = load;
  }

  async load() {
    await this._load.exec();
  }
}
