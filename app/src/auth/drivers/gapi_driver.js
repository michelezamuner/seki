export default class GapiDriver {
  constructor(api) {
    this._api = api;
  }

  async login() {
    const response = await this._api.get('app://gapi/login');
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }
}
