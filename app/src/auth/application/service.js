export default class Service {
  constructor(authDriver, authTokenFactory, authRepository) {
    this._authDriver = authDriver;
    this._authTokenFactory = authTokenFactory;
    this._authRepository = authRepository;
  }

  async login() {
    await this._authDriver.login();
  }
}
