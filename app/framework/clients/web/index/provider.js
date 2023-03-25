import Presenter from './presenter.js';
import Index from '../../../../features/index.js';
import Controller from './controller.js';

export default class Provider {
  constructor(routesRepository, ui, routesPresenter) {
    this._routesRepository = routesRepository;
    this._ui = ui;
    this._routesPresenter = routesPresenter;
  }

  provide() {
    const presenter = new Presenter(this._ui, this._routesPresenter);
    const feature = new Index(this._routesRepository, presenter);

    return new Controller(feature);
  }
}
