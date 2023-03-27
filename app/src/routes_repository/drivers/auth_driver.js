import User from '../domain/user.js';

export default class AuthDriver {
  constructor(api) {
    this._api = api;
    this._authContexts = {};
  }

  async auth(authToken) {
    const response = await this._api.get('app://auth/context', { authToken: authToken });
    if (response.status === 'error') {
      throw response.data.reason;
    }

    this._authContexts[authToken] = response.data.authContext;

    return new User(authToken);
  }

  authContext(user) {
    return this._authContexts[user.authToken];
  }
}
