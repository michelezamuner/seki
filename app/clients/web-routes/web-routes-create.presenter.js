export class WebRoutesCreatePresenter {
  constructor (webRoutesCreateView) {
    this._webRoutesCreateView = webRoutesCreateView;
  }

  present () {
    this._webRoutesCreateView.render();
  }
}
