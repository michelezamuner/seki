export default class Service {
  constructor(routesRepository) {
    this._routesRepository = routesRepository;
  }

  async index() {
    return await this._routesRepository.routes();
  }

  async update() {
    await this._routesRepository.update();
  }
}
