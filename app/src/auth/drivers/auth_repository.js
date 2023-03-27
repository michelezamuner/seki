export default class AuthRepository {
  constructor() {
    this._authContexts = {};
  }

  store(authContext) {
    this._authContexts[authContext.client.getToken()] = authContext;
  }

  get(authToken) {
    return this._authContexts[authToken];
  }
}
