export class WebPalettePresenter {
  constructor (webPaletteView) {
    this._webPaletteView = webPaletteView;
  }

  present (webPaletteLoadResponse) {
    const map = webPaletteLoadResponse.map;
    const webPaletteLoadViewModel = {
      map: map
    };
    this._webPaletteView.render(webPaletteLoadViewModel);
  }
}
