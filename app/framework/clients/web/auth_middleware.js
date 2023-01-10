export default class AuthMiddleware {
  constructor(authDriver) {
    this._authDriver = authDriver;
  }

  async handle(request) {
    const authContext = await this._authDriver.auth();

    request.authContext = authContext;

    return request;
  }
}
