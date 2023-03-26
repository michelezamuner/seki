export default class AuthRepository {
  constructor() {
    this._authContexts = {};
  }

  store(authToken, authContext) {
    this._authContexts[authToken] = authContext;
  }

  get(authToken) {
    return this._authContexts[authToken];
  }
}
