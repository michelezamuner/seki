export default class Service {
  constructor(authDriver) {
    this._authDriver = authDriver;
  }

  async login() {
    await this._authDriver.login();
  }
}
