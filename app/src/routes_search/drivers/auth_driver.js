export default class AuthDriver {
  constructor(api) {
    this._api = api;
  }

  async auth() {
    const response = await this._api.get('app://auth/auth');
    if (response.status === 'error') {
      throw response.data.reason;
    }

    return response.data.authToken;
  }
}
