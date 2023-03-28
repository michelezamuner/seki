import Route from '../domain/route.js';

export default class Service {
  constructor(dataDriver, routesRepository, searchDriver) {
    this._dataDriver = dataDriver;
    this._routesRepository = routesRepository;
    this._searchDriver = searchDriver;
    this._isInitialized = false;
    this._canSearch = true;
  }

  async index() {
    if (!this._isInitialized) {
      await this.update();
      this._isInitialized = true;
    }

    return this._routesRepository.routes();
  }

  async update() {
    this._canSearch = false;
    await this._searchDriver.reset();

    const routesData = await this._dataDriver.loadRoutesData();
    const gpxData = await this._dataDriver.loadGpxData();

    const routes = await Promise.all(routesData.map((routeData, i) => {
      const route = new Route({
        id: routeData[0],
        name: routeData[1],
        track: gpxData[i],
      });

      this._searchDriver.add(route);

      return route;
    }));

    this._routesRepository.reset(routes);
    this._canSearch = true;
  }

  async search(query) {
    if (!this._canSearch) {
      throw 'Search is disabled, try later';
    }
    const ids = await this._searchDriver.search(query);

    return this._routesRepository.find(ids);
  }
}
