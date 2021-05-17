export class WebRoutesErrorView {
  constructor (dom) {
    this._dom = dom;
  }

  render (webRoutesErrorViewModel) {
    const message = 'Error: ' + webRoutesErrorViewModel.message;
    this._dom.alert(message);
  }
}
