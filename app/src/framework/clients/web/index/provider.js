import Presenter from './presenter.js';
import Index from '../../../../features/index.js';
import Controller from './controller.js';

export default class Provider {
  constructor(routesRepository, ui, routesPresenter) {
    this._routesRepository = routesRepository;
    this._ui = ui;
    this._routesPresenter = routesPresenter;
  }

  provide(dispatcher) {
    const presenter = new Presenter(this._ui, this._routesPresenter);
    const service = new Index(this._routesRepository, presenter);
    const controller = new Controller(service);

    controller.register(dispatcher);
  }
}
