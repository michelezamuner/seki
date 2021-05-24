import { Leaflet } from './leaflet.js';

export const LeafletProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }
    const dispatcher = container.get('dispatcher');
    dispatcher.register('ui.dom', dom => {
      dispatcher.dispatch('ui.leaflet', Leaflet);
    });

    this._provided = true;
  }
};
