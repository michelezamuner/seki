export default class RoutesRepository {
  constructor() {
    this._routes = {};
    this._isInitialized = false;
  }

  get isInitialized() {
    return this._isInitialized;
  }

  update(user, routes) {
    this._routes[user.authToken] = routes;
    this._isInitialized = true;
  }

  routes(user) {
    return this._routes[user.authToken];
  }
}
