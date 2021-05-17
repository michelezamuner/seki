export class WebRoutesCreateController {
  constructor (routesApi) {
    this._routesApi = routesApi;

    this._onLoadListeners = [];
    this._onCreateCommandListeners = [];
  }

  registerOnLoadListener (listener) {
    this._onLoadListeners.push(listener);
  }

  registerOnCreateCommandListener (listener) {
    this._onCreateCommandListeners.push(listener);
  }

  load () {
    for (const listener of this._onLoadListeners) {
      listener();
    }
  }

  onCommand (command) {
    const indexOfLarge = command.indexOf('create route');
    const indexOfShort = command.indexOf('c r');
    if (indexOfLarge !== 0 && indexOfShort !== 0) {
      return;
    }

    const routeName = indexOfLarge === 0
      ? command.substring(13)
      : command.substring(4);

    for (const listener of this._onCreateCommandListeners) {
      listener(routeName);
    }
  }

  onTrackLoaded (track, routeName) {
    if (routeName === '') {
      routeName = 'New route';
    }
    const routesApiCreateRequest = {
      track: track,
      name: routeName
    };
    this._routesApi.create(routesApiCreateRequest);
  }
}
