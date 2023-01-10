import config from './config.js';
import Gapi from './lib/gapi.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import RoutesPresenter from './framework/clients/web/routes_presenter.js';
import LoadProvider from './framework/clients/web/load_provider.js';
import Router from './framework/clients/web/router.js';

document.addEventListener('DOMContentLoaded', () => {
  const gapi = new Gapi(window, document, config.gapi);
  const ui = new Ui(document, window.L, config.ui);
  const routesPresenter = new RoutesPresenter(ui);

  gapi.setup(async(gapi) => {
    const routesRepository = new GapiRoutesRepository(gapi.client, config.db);

    const loadProvider = new LoadProvider(routesRepository, ui, routesPresenter);

    const router = new Router(loadProvider);

    await router.route();
  });
});
