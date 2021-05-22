export class RoutesApiRead {
  constructor (dispatcher, readModel, presenter) {
    this._dispatcher = dispatcher;
    this._readModel = readModel;
    this._presenter = presenter;

    this._dispatcher.register('app.created.routes', routeId => {
      this.displayRoute({ id: routeId });
    });
  }

  displayRoute (routesApiFindRequest) {
    const routeId = routesApiFindRequest.id;
    const route = this._readModel.findById('routes', routeId);
    const routesApiFindResponse = {
      route: route
    };
    this._presenter.present(routesApiFindResponse);
  }
}
