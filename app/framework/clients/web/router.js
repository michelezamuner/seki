export default class Router {
  constructor(middlewares, loadProvider, searchProvider) {
    this._middlewares = middlewares;
    this._loadProvider = loadProvider;
    this._searchProvider = searchProvider;
  }

  async route(request) {
    for (const middleware of this._middlewares) {
      request = await middleware.handle(request);
    }

    const loadController = this._loadProvider.provide();
    const searchController = this._searchProvider.provide();

    switch (request.route) {
    case '/':
      await loadController.load(request);
      break;
    case '/search/input':
      searchController.input(request);
      break;
    case '/search/query':
      searchController.query(request);
      break;
    }
  }
}
