import { DomProvider } from '../../frameworks/dom/dom-provider.js';
import { WebMapProvider } from '../web-map/web-map.provider.js';
import { WebRoutesCreateView } from './web-routes-create.view.js';
import { WebRoutesCreatePresenter } from './web-routes-create.presenter.js';
import { WebRoutesCreateController } from './web-routes-create.controller.js';

export const WebRoutesProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    DomProvider.provide(container);
    WebMapProvider.provide(container);

    const dispatcher = container.get('dispatcher');

    dispatcher.register('ui.dom', dom => {
      const routesApi = container.get('api.routes');
      const webRoutesCreateView = new WebRoutesCreateView(dom);
      const webRoutesCreatePresenter = new WebRoutesCreatePresenter(webRoutesCreateView);
      const webRoutesCreateController = new WebRoutesCreateController(routesApi);

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

    this._provided = true;
  }
};
