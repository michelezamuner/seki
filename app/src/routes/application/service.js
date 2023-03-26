export default class Service {
  constructor(authDriver, routesRepository, routesSearch) {
    this._authDriver = authDriver;
    this._routesRepository = routesRepository;
    this._routesSearch = routesSearch;
  }

  async login() {
    return await this._authDriver.auth();
  }

  async index(authToken) {
    return await this._routesRepository.routes(authToken);
  }

  async search(authToken, query) {
    return await this._routesSearch.search(authToken, query);
  }

  async update(authToken) {
    await this._routesRepository.update(authToken);
  }
}
