export default class Service {
  constructor(authDriver, routesRepository, routesSearch) {
    this._authDriver = authDriver;
    this._routesRepository = routesRepository;
    this._routesSearch = routesSearch;
  }

  async login() {
    await this._authDriver.login();
  }

  async index() {
    return await this._routesRepository.routes();
  }

  async search(query) {
    return await this._routesSearch.search(query);
  }

  async update() {
    await this._routesRepository.update();
  }
}
