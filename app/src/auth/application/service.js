export default class Service {
  constructor(authDriver, authTokenFactory, authRepository) {
    this._authDriver = authDriver;
    this._authTokenFactory = authTokenFactory;
    this._authRepository = authRepository;
  }

  async auth() {
    const authContext = await this._authDriver.auth();
    const authToken = this._authTokenFactory.create();
    this._authRepository.store(authToken, authContext);

    return authToken;
  }

  async context(authToken) {
    const context = this._authRepository.get(authToken);

    if (!context) {
      throw 'Invalid auth token';
    }

    return context;
  }
}
