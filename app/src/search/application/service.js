export default class Service {
  constructor(index, domainService) {
    this._index = index;
    this._domainService = domainService;
  }

  async reset() {
    this._index.reset();
  }

  async add(value) {
    this._index.add(value);
  }

  async search(query) {
    const criteria = this._domainService.criteria(query);

    return await this._index.search(criteria);
  }
}
