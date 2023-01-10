export default class LoadPresenter {
  constructor(ui, routesPresenter) {
    this._ui = ui;
    this._routesPresenter = routesPresenter;
  }

  async present(routesPromise) {
    this._ui.map._container.classList.add('cursor-wait');

    const routes = await routesPromise;
    this._routesPresenter.present(routes);

    this._ui.map._container.classList.remove('cursor-wait');
  }
}
