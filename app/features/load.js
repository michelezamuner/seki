export default class Load {
  constructor(repository, presenter) {
    this._repository = repository;
    this._presenter = presenter;
  }

  async exec() {
    this._presenter.present(this._repository.search());
  }
}
