import Presenter from './presenter.js';
import Load from '../../../../features/load.js';
import Controller from './controller.js';

export default class Provider {
  constructor(routesRepository, ui, routesPresenter) {
    this._routesRepository = routesRepository;
    this._ui = ui;
    this._routesPresenter = routesPresenter;
  }

  provide() {
    const presenter = new Presenter(this._ui, this._routesPresenter);
    const load = new Load(this._routesRepository, presenter);

    return new Controller(load);
  }
}
