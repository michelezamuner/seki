export default class ListRoutes {
  constructor(repository, presenter) {
    this._repository = repository;
    this._presenter = presenter;
  }

  async exec() {
    await this._presenter.present(this._repository.list());
  }
}
