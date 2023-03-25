import config from './config.js';
import Dispatcher from './lib/dispatcher.js';
import WebEventFactory from './lib/web_event_factory.js';
import Gapi from './lib/gapi.js';
import GapiAuthDriver from './src/drivers/gapi_auth_driver.js';
import AuthMiddleware from './src/clients/web/auth_middleware.js';
import Ui from './src/clients/web/ui.js';
import GapiRoutesRepository from './src/drivers/gapi_routes_repository.js';
import RoutesPresenter from './src/clients/web/routes_presenter.js';
import IndexProvider from './src/clients/web/index/provider.js';
import SearchProvider from './src/clients/web/search/provider.js';

window.addEventListener('DOMContentLoaded', async() => {
  const dispatcher = new Dispatcher(window, new WebEventFactory());
  const gapi = new Gapi(window, document, config.gapi);
  const gapiAuthDriver = new GapiAuthDriver(gapi);
  const authMiddleware = new AuthMiddleware(gapiAuthDriver);

  dispatcher.middleware(authMiddleware);

  // TODO: wait for L to be loaded
  const ui = new Ui(document, window.L, config.ui);

  const routesPresenter = new RoutesPresenter(ui);
  const routesRepository = new GapiRoutesRepository(config.db);

  const indexProvider = new IndexProvider(routesRepository, ui, routesPresenter);
  indexProvider.provide(dispatcher);

  const searchProvider = new SearchProvider();
  searchProvider.provide(dispatcher);

  await dispatcher.dispatch('start');
});
