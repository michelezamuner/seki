export default class Listener {
  constructor(controller) {
    this._controller = controller;
  }

  listeners() {
    return {
      'routes_repository.update_started': () => this._onUpdateStarted(),
      'routes_repository.route_loaded': (e) => this._onRouteLoaded(e),
      'routes_repository.update_completed': () => this._onUpdateCompleted(),
    };
  }

  _onUpdateStarted() {
    this._controller.lockIndex();
  }

  _onRouteLoaded(event) {
    this._controller.updateIndex({ route: event.route });
  }

  _onUpdateCompleted() {
    this._controller.unlockIndex();
  }
}
