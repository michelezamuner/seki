export class WebRoutesPresenter {
  constructor (webRoutesView) {
    this._webRoutesView = webRoutesView;
  }

  present (webRoutesResponse) {
    const route = webRoutesResponse.route;
    const webRoutesViewModel = {
      route: route
    };
    this._webRoutesView.render(webRoutesViewModel);
  }
}
