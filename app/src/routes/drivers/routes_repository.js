import Route from '../domain/route.js';

export default class RoutesRepository {
  constructor(api) {
    this._api = api;
  }

  async update(authToken) {
    const response = await this._api.get('app://routes_repository/update', { authToken: authToken });
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }

  async routes(authToken) {
    const response = await this._api.get('app://routes_repository/routes', { authToken: authToken });
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
