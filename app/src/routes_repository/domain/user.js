export default class User {
  constructor(authToken) {
    this._authToken = authToken;
  }

  get authToken() {
    return this._authToken;
  }
}
