export default class AuthMiddleware {
  constructor(authDriver) {
    this._authDriver = authDriver;
    this._authContext = null;
  }

  async handle(request) {
    if (this._authContext === null) {
      this._authContext = await this._authDriver.auth();
    }

    request.authContext = this._authContext;

    return request;
  }
}
