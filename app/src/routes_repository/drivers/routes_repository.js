export default class RoutesRepository {
  constructor() {
    this._routes = null;
  }

  get isInitialized() {
    return this._routes !== null;
  }

  update(routes) {
    this._routes = routes;
  }

  routes() {
    return this._routes;
  }
}
