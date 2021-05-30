export class RoutesApiWrite {
  constructor (dispatcher, service, presenter) {
    this._dispatcher = dispatcher;
    this._service = service;
    this._presenter = presenter;
  }

  create (routesApiCreateRequest) {
    const routeName = routesApiCreateRequest.name;
    const routeTrack = routesApiCreateRequest.track;
    try {
      const route = this._service.createRoute(routeName, routeTrack);
      this._dispatcher.dispatch('app.create', { context: 'routes', data: route });
    } catch (e) {
      const routesApiErrorResponse = {
        error: 'Duplicated route',
        data: routeName
      };
      this._presenter.presentError(routesApiErrorResponse);
    }
  }
}
