export class WebRoutesErrorPresenter {
  constructor (webRoutesErrorView) {
    this._webRoutesErrorView = webRoutesErrorView;
  }

  presentError (webRoutesErrorResponse) {
    const error = webRoutesErrorResponse.error;
    const webRoutesErrorViewModel = {
      message: error
    };
    this._webRoutesErrorView.render(webRoutesErrorViewModel);
  }
}
