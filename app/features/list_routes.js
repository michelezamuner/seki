export default class ListRoutes {
  constructor(routesRepository) {
    this._routesRepository = routesRepository;
  }

  async exec() {
    return await this._routesRepository.list();
  }
}
