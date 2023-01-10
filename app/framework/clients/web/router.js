export default class Router {
  constructor(loadProvider) {
    this._loadProvider = loadProvider;
  }

  async route() {
    const loadController = this._loadProvider.provide();

    await loadController.load();
  }
}