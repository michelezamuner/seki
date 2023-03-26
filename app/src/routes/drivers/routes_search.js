import Route from '../domain/route.js';

export default class RoutesSearch {
  constructor(api) {
    this._api = api;
  }

  async search(authToken, query) {
    // @todo: map to route entities
    const response = await this._api.get('app://routes_search/search', { authToken: authToken, query: query });
    if (response.status === 'error') {
      throw response.data.reason;
    }

    return response.data.routes;
  }
}
