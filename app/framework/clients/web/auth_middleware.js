export default class AuthMiddleware {
  constructor(authDriver) {
    this._authDriver = authDriver;
    this._authContext = null;
  }

  async handle(event) {
    if (this._authContext === null) {
      // @todo: what if auth fails?
      this._authContext = await this._authDriver.auth();
    }

    event.authContext = this._authContext;

    return event;
  }
}
