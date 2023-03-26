export default class Listener {
  constructor(controller) {
    this._controller = controller;
  }

  listeners() {
    return {
      update_started: () => this._onUpdateStarted(),
      route_loaded: (e) => this._onRouteLoaded(e),
      update_completed: () => this._onUpdateCompleted(),
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
