import config from './config.js';
import Dispatcher from './lib/dispatcher.js';
import WebEventFactory from './lib/web_event_factory.js';
import Gapi from './lib/gapi.js';
import GapiAuthDriver from './framework/gapi_auth_driver.js';
import AuthMiddleware from './framework/clients/web/auth_middleware.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import RoutesPresenter from './framework/clients/web/routes_presenter.js';
import IndexProvider from './framework/clients/web/index/provider.js';
import SearchProvider from './framework/clients/web/search/provider.js';

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
