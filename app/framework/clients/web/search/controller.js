export default class Controller {
  constructor(presenter) {
    this._presenter = presenter;
  }

  register(dispatcher) {
    dispatcher.listener('keypress', e => this._input(e));
    dispatcher.listener('search_query', e => this._query(e));
  }

  async _input(event) {
    if (event.code === 'KeyS') {
      // @todo: we need to wait for data to be loaded
      this._presenter.presentInput();
    }
  }

  async _query(event) {
    console.log(event.query);
  }
}
