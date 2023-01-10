import config from './config.js';
import Gapi from './lib/gapi.js';
import GapiAuthDriver from './framework/gapi_auth_driver.js';
import AuthMiddleware from './framework/clients/web/auth_middleware.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import RoutesPresenter from './framework/clients/web/routes_presenter.js';
import LoadProvider from './framework/clients/web/load/provider.js';
import SearchProvider from './framework/clients/web/search/provider.js';
import Router from './framework/clients/web/router.js';
import Listener from './framework/clients/web/listener.js';

window.addEventListener('DOMContentLoaded', async() => {
  const gapi = new Gapi(window, document, config.gapi);
  const gapiAuthDriver = new GapiAuthDriver(gapi);
  const authMiddleware = new AuthMiddleware(gapiAuthDriver);

  const middlewares = [authMiddleware];

  // TODO: wait for L to be loaded
  const ui = new Ui(window, document, window.L, config.ui);

  const routesPresenter = new RoutesPresenter(ui);
  const routesRepository = new GapiRoutesRepository(config.db);
  const loadProvider = new LoadProvider(routesRepository, ui, routesPresenter);

  const searchProvider = new SearchProvider(ui);

  const router = new Router(middlewares, loadProvider, searchProvider);

  const listener = new Listener(window, router);

  await listener.start(window);
});
