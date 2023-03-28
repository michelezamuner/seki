export default class SearchDriver {
  constructor(api) {
    this._api = api;
  }

  async reset() {
    const response = await this._api.get('app://search/reset');
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }

  async add(value) {
    const response = await this._api.get('app://search/add', { value: value });
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }

  async search(query) {
    const response = await this._api.get('app://search/search', { query: query });
    if (response.status === 'error') {
      throw response.data.reason;
    }

    return response.data.values;
  }
}