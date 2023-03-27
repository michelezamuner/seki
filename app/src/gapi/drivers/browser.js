export default class Browser {
  constructor(window, dispatcher) {
    this._window = window;
    this._dispatcher = dispatcher;
  }

  get gapi() {
    return this._window.gapi;
  }

  get google() {
    return this._window.google;
  }

  setup() {
    this._addScript('https://apis.google.com/js/api.js', 'gapi.gapi_loaded');
    this._addScript('https://accounts.google.com/gsi/client', 'gapi.gsi_loaded');
  }

  _addScript(src, event, async = true, defer = true) {
    const script = this._window.document.createElement('script');
    script.async = async;
    script.defer = defer;
    script.setAttribute('src', src);
    script.onload = () => this._dispatcher.dispatch(event);

    this._window.document.body.appendChild(script);
  }
}
