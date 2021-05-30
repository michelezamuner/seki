export class WebRoutesCreateController {
  constructor (dispatcher, routesApiWrite) {
    this._dispatcher = dispatcher;
    this._routesApiWrite = routesApiWrite;
  }

  createRoute (name) {
    this._dispatcher.dispatch('ui.web-routes.create', name);
  }

  loadRoute (name, track) {
    const routesApiCreateRequest = {
      name: name,
      track: track
    };
    this._routesApiWrite.create(routesApiCreateRequest);
  }
}
