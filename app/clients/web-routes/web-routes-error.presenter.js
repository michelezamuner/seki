export class WebRoutesErrorPresenter {
  constructor (webRoutesErrorView) {
    this._webRoutesErrorView = webRoutesErrorView;
  }

  present (webRoutesErrorResponse) {
    const error = webRoutesErrorResponse.error;
    const webRoutesErrorViewModel = {
      message: error
    };
    this._webRoutesErrorView.render(webRoutesErrorViewModel);
  }
}
