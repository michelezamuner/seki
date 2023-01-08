import config from './config.js';
import Gapi from './lib/gapi.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import LoadRoutesPresenter from './framework/clients/web/load_routes_presenter.js';
import ListRoutesPresenter from './framework/clients/web/list_routes_presenter.js';
import LoadRoutes from './features/load_routes.js';
import ListRoutes from './features/list_routes.js';

document.addEventListener('DOMContentLoaded', () => {
  const gapi = new Gapi(window, document, config.gapi);
  const ui = new Ui(document, window.L, config.ui);
  const loadRoutesPresenter = new LoadRoutesPresenter(ui);
  const listRoutesPresenter = new ListRoutesPresenter(ui);

  gapi.setup(async(gapi) => {
    const routesRepository = new GapiRoutesRepository(gapi.client, config.db);

    const loadRoutes = new LoadRoutes(routesRepository, loadRoutesPresenter);
    await loadRoutes.exec();

    const listRoutes = new ListRoutes(routesRepository, listRoutesPresenter);
    await listRoutes.exec();
  });
});
