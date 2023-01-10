export default class Load {
  constructor(routesRepository, presenter) {
    this._routesRepository = routesRepository;
    this._presenter = presenter;
  }

  async exec(authContext) {
    this._presenter.present(this._routesRepository.search(authContext));
  }
}
