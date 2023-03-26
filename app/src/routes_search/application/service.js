export default class Service {
  constructor(routesIndex, domainService) {
    this._routesIndex = routesIndex;
    this._domainService = domainService;
  }

  lockIndex() {
    this._routesIndex.lock();
  }

  updateIndex(route) {
    this._routesIndex.update(route);
  }

  unlockIndex() {
    this._routesIndex.unlock();
  }

  async search(query) {
    if (this._routesIndex.isLocked) {
      throw 'Search index is not available, try later';
    }

    const criteria = this._domainService.criteria(query);

    return await this._routesIndex.search(criteria);
  }
}
