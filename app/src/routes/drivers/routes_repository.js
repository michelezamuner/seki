import Route from '../domain/route.js';

export default class RoutesRepository {
  constructor(api) {
    this._api = api;
  }

  async update() {
    const response = await this._api.get('app://routes_repository/update');
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }

  async routes() {
    const response = await this._api.get('app://routes_repository/routes');
    if (response.status === 'error') {
      throw response.data.reason;
    }

    const routesData = response.data.routes;

    return routesData.map(routeData => new Route({
      id: routeData.data[0],
      name: routeData.data[1],
      track: routeData.track,
    }));
  }
}
