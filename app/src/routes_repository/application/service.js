import Route from '../domain/route.js';

export default class Service {
  constructor(dataDriver, routesRepository, dispatcher) {
    this._dataDriver = dataDriver;
    this._routesRepository = routesRepository;
    this._dispatcher = dispatcher;
  }

  async update() {
    this._dispatcher.dispatch('routes_repository.update_started');

    const routesData = await this._dataDriver.loadRoutesData();
    const gpxData = await this._dataDriver.loadGpxData();

    const routes = routesData.map((routeData, i) => {
      const route = new Route(routeData, gpxData[i]);

      this._dispatcher.dispatch('routes_repository.route_loaded', { route: route });

      return route;
    });

    this._routesRepository.update(routes);

    this._dispatcher.dispatch('routes_repository.update_completed');
  }

  async routes() {
    if (!this._routesRepository.isInitialized) {
      await this.update();
    }

    return this._routesRepository.routes();
  }
}
