export class RoutesRepository {
  constructor (driver) {
    this._driver = driver;
  }

  findByName (name) {
    return this._driver.findRouteByName(name);
  }
}
