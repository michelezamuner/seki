import Presenter from './presenter.js';
import Controller from './controller.js';

export default class Provider {
  constructor(ui) {
    this._ui = ui;
  }

  provide() {
    const presenter = new Presenter(this._ui);

    return new Controller(presenter);
  }
}
