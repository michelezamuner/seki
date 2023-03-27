export default class AuthDriver {
  constructor(api) {
    this._api = api;
  }

  async login() {
    const response = await this._api.get('app://auth/login');
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }
}
