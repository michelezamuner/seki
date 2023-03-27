export default class RoutesRepository {
  constructor() {
    this._routes = {};
    this._isInitialized = false;
  }

  get isInitialized() {
    return this._isInitialized;
  }

  update(routes) {
    this._routes = routes;
    this._isInitialized = true;
  }

  routes() {
    return this._routes;
  }
}
