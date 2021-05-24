import { DomProvider } from '../../frameworks/dom/dom-provider.js';
import { LeafletProvider } from '../../frameworks/leaflet/leaflet-provider.js';
import { WebMapProvider } from '../web-map/web-map.provider.js';
import { WebPaletteController } from './web-palette.controller.js';
import { WebPaletteView } from './web-palette.view.js';
import { WebPalettePresenter } from './web-palette.presenter.js';

export const WebPaletteProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }
    DomProvider.provide(container);
    LeafletProvider.provide(container);
    WebMapProvider.provide(container);

    const dispatcher = container.get('dispatcher');

    dispatcher.register(['ui.dom', 'ui.map', 'ui.leaflet'], (dom, map, leaflet) => {
      const config = container.get('config.palette');
      const webPaletteView = new WebPaletteView(dom, leaflet, config);
      const webPalettePresenter = new WebPalettePresenter(webPaletteView);
      const webPaletteController = new WebPaletteController(dispatcher);

      webPaletteController.registerOnLoadListener(map => {
        const webPaletteLoadResponse = {
          map: map
        };
        webPalettePresenter.present(webPaletteLoadResponse);
      });
      webPaletteView.registerOnCommandListener(command => {
        webPaletteController.sendCommand(command);
      });

      webPaletteController.load(map);
    });

    this._provided = true;
  }
};
