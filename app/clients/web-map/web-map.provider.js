import { DomProvider } from '../../frameworks/dom/dom-provider.js';
import { LeafletProvider } from '../../frameworks/leaflet/leaflet-provider.js';
import { WebMapController } from './web-map.controller.js';
import { WebMapPresenter } from './web-map.presenter.js';
import { WebMapView } from './web-map.view.js';

export const WebMapProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }
    DomProvider.provide(container);
    LeafletProvider.provide(container);

    const dispatcher = container.get('dispatcher');
    dispatcher.register(['ui.dom', 'ui.leaflet'], (dom, leaflet) => {
      const webMapView = new WebMapView(dispatcher, dom, leaflet);
      const presenter = new WebMapPresenter(webMapView);
      const mapApi = container.get('api.map', presenter);
      const webMapController = new WebMapController(mapApi);

      webMapController.load();
    });
    this._provided = true;
  }
};
