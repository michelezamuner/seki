import { MapApi } from './map-api.js';

export const MapApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    const config = container.get('config.map');
    dispatcher.dispatch('api.map', presenter => {
      return new MapApi(config, presenter);
    });

    this._provided = true;
  }
};
