import { Leaflet } from './leaflet.js';

export const LeafletProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }
    container.bind('leaflet', Leaflet);
  }
};
