import LoadPresenter from './load_presenter.js';
import Load from '../../../features/load.js';
import LoadController from './load_controller.js';

export default class LoadProvider {
  constructor(routesRepository, ui, routesPresenter) {
    this._routesRepository = routesRepository;
    this._ui = ui;
    this._routesPresenter = routesPresenter;
  }

  provide() {
    const loadPresenter = new LoadPresenter(this._ui, this._routesPresenter);
    const loadFeature = new Load(this._routesRepository, loadPresenter);

    return new LoadController(loadFeature);
  }
}
