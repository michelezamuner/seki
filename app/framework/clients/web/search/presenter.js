export default class Presenter  {
  constructor(ui) {
    this._ui = ui;
  }

  presentInput() {
    this._ui.dispatch('searchInput', prompt('Search'));
  }
}
