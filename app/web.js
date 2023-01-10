import config from './config.js';
import Gapi from './lib/gapi.js';
import GapiAuthDriver from './framework/gapi_auth_driver.js';
import AuthMiddleware from './framework/clients/web/auth_middleware.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import RoutesPresenter from './framework/clients/web/routes_presenter.js';
import LoadProvider from './framework/clients/web/load/provider.js';
import Router from './framework/clients/web/router.js';

document.addEventListener('DOMContentLoaded', async() => {
  const gapi = new Gapi(window, document, config.gapi);
  const gapiAuthDriver = new GapiAuthDriver(gapi);
  const authMiddleware = new AuthMiddleware(gapiAuthDriver);

  const ui = new Ui(document, window.L, config.ui);
  const routesPresenter = new RoutesPresenter(ui);
  const routesRepository = new GapiRoutesRepository(config.db);
  const loadProvider = new LoadProvider(routesRepository, ui, routesPresenter);

  const router = new Router(loadProvider);

  let request = {};
  request = await authMiddleware.handle(request);

  await router.route(request);
});
