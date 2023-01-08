import config from './config.js';
import Gapi from './lib/gapi.js';
import Ui from './framework/clients/web/ui.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import ListRoutesPresenter from './framework/clients/web/list_routes_presenter.js';
import ListRoutes from './features/list_routes.js';

document.addEventListener('DOMContentLoaded', () => {
  const gapi = new Gapi(window, document, config.gapi);
  const ui = new Ui(document, window.L, config.ui);
  const listRoutesPresenter = new ListRoutesPresenter(ui);

  gapi.setup(async(gapi) => {
    const routesRepository = new GapiRoutesRepository(gapi.client, config.db);
    const listRoutes = new ListRoutes(routesRepository, listRoutesPresenter);

    await listRoutes.exec();
  });
});
