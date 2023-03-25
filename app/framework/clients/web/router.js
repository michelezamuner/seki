export default class Router {
  constructor(middlewares, indexProvider, searchProvider) {
    this._middlewares = middlewares;
    this._indexProvider = indexProvider;
    this._searchProvider = searchProvider;
  }

  async route(request) {
    for (const middleware of this._middlewares) {
      request = await middleware.handle(request);
    }

    const indexController = this._indexProvider.provide();
    const searchController = this._searchProvider.provide();

    switch (request.route) {
    case '/':
      await indexController.index(request);
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
