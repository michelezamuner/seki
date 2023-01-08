export default class LoadRoutesPresenter {
  constructor(ui) {
    this._ui = ui;
  }

  async present(loadPromise) {
    this._ui.map._container.classList.add('cursor-wait');

    await loadPromise;

    this._ui.map._container.classList.remove('cursor-wait');
  }
}
