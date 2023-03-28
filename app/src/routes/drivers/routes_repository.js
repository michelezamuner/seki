export default class RoutesRepository {
  constructor() {
    this._routes;
  }

  async reset(routes) {
    this._routes = routes;
  }

  routes() {
    return this._routes;
  }

  find(ids) {
    return this._routes.filter(route => ids.includes(route.id));
  }
}
