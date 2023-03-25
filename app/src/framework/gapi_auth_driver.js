export default class GapiAuthDriver {
  constructor(gapi) {
    this._gapi = gapi;
  }

  async auth() {
    return new Promise(resolve => this._gapi.setup(resolve));
  }
}
