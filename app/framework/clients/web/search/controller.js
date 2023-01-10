export default class Controller {
  constructor(presenter) {
    this._presenter = presenter;
  }

  input() {
    this._presenter.presentInput();
  }

  query(request) {
    console.log(request);
  }
}
