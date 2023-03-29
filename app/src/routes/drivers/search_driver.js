import SearchItem from '../domain/search_item.js';

export default class SearchDriver {
  constructor(api) {
    this._api = api;
  }

  async reset() {
    const response = await this._api.delete('app://search/reset');
    if (response.status === 'error') {
      throw response.data.reason;
    }
  }

  async add(route) {
    const searchItem = new SearchItem(route);
    const response = await this._api.post('app://search/add', { value: searchItem });
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
