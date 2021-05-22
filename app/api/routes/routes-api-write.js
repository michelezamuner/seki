import { RouteEntity } from '../../domain/routes/route.entity.js';

export class RoutesApiWrite {
  constructor (dispatcher, routesRepository, presenter) {
    this._dispatcher = dispatcher;
    this._routesRepository = routesRepository;
    this._presenter = presenter;
  }

  create (routesApiCreateRequest) {
    const routeName = routesApiCreateRequest.name;
    const routeTrack = routesApiCreateRequest.track;
    if (this._routesRepository.findByName(routeName)) {
      const routesApiErrorResponse = {
        error: 'Duplicated route',
        data: routeName
      };
      this._presenter.presentError(routesApiErrorResponse);

      return;
    }

    const route = new RouteEntity(routeName, routeTrack);
    this._dispatcher.dispatch('app.create', { context: 'routes', data: route });
  }
}
