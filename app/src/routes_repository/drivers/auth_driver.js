export default class AuthDriver {
  constructor(api) {
    this._api = api;
  }

  async context(authToken) {
    const response = await this._api.get('app://auth/context', { authToken: authToken });
    if (response.status === 'error') {
      throw response.data.reason;
    }

    return response.data.authContext;
  }
}
