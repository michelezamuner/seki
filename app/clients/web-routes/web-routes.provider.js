import { DomProvider } from '../../frameworks/dom/dom.provider.js';
import { WebMapProvider } from '../web-map/web-map.provider.js';
import { WebRoutesCreateView } from './web-routes-create.view.js';
import { WebRoutesCreatePresenter } from './web-routes-create.presenter.js';
import { WebRoutesCreateController } from './web-routes-create.controller.js';
import { WebRoutesErrorView } from './web-routes-error.view.js';
import { WebRoutesErrorPresenter } from './web-routes-error.presenter.js';
import { WebRoutesView } from './web-routes.view.js';
import { WebRoutesPresenter } from './web-routes.presenter.js';

export const WebRoutesProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    DomProvider.provide(container);
    WebMapProvider.provide(container);

    const dispatcher = container.get('dispatcher');

    dispatcher.register(['ui.dom', 'api.routes.write'], (dom, apiFactory) => {
      const webRoutesErrorView = new WebRoutesErrorView(dom);
      const webRoutesErrorPresenter = new WebRoutesErrorPresenter(webRoutesErrorView);
      const routesApiWrite = apiFactory(webRoutesErrorPresenter);
      const webRoutesCreateView = new WebRoutesCreateView(dom);
      const webRoutesCreatePresenter = new WebRoutesCreatePresenter(webRoutesCreateView);
      const webRoutesCreateController = new WebRoutesCreateController(routesApiWrite);

      dispatcher.register('command', command => {
        webRoutesCreateController.onCommand(command);
      });
      webRoutesCreateController.registerOnLoadListener(() => {
        webRoutesCreatePresenter.present();
      });
      webRoutesCreateController.registerOnCreateCommandListener(routeName => {
        webRoutesCreateView.onCreateCommand(routeName);
      });
      webRoutesCreateView.registerOnTrackLoadedListener((track, routeName) => {
        webRoutesCreateController.onTrackLoaded(track, routeName);
      });

      webRoutesCreateController.load();
    });

    dispatcher.register(['ui.dom', 'ui.map', 'ui.leaflet', 'api.routes.read'], (dom, map, leaflet, apiFactory) => {
      const webRoutesView = new WebRoutesView(dom, leaflet, map);
      const webRoutesPresenter = new WebRoutesPresenter(webRoutesView);
      apiFactory(webRoutesPresenter);
    });

    this._provided = true;
  }
};
