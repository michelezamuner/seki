import { MapApi } from './map-api.js';

export const MapApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const config = container.get('config.map');
    container.bind('api.map', presenter => {
      return new MapApi(config, presenter);
    });

    this._provided = true;
  }
};
