import Route from '../domain/route.js';

export default class Service {
  constructor(dataDriver, routesRepository, dispatcher) {
    this._dataDriver = dataDriver;
    this._routesRepository = routesRepository;
    this._dispatcher = dispatcher;
  }

  async update(authContext) {
    this._dispatcher.dispatch('routes_repository.update_started');

    const routesData = await this._dataDriver.loadRoutesData(authContext);
    const gpxData = await this._dataDriver.loadGpxData(authContext);

    const routes = routesData.map((routeData, i) => {
      const route = new Route(routeData, gpxData[i]);

      this._dispatcher.dispatch('routes_repository.route_loaded', { route: route });

      return route;
    });

    this._routesRepository.update(routes);

    this._dispatcher.dispatch('routes_repository.update_completed');
  }

  async routes(authContext) {
    if (!this._routesRepository.isInitialized) {
      await this.update(authContext);
    }

    return this._routesRepository.routes();
  }
}
