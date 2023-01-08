/* global L */
import config from './config.js';
import Gapi from './lib/gapi.js';
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import ListRoutesPresenter from './framework/clients/web/list_routes_presenter.js';
import ListRoutes from './features/list_routes.js';

document.addEventListener('DOMContentLoaded', () => {
  const gapi = new Gapi(document, config.gapi);

  gapi.setup(async() => {
    await draw();
  });
});

async function draw() {
  const routesRepository = new GapiRoutesRepository(window.gapi.client, '1UShRn42inpoiWNgBlfQaV6OFtxrbeEXO5bmm1mFNjp4');
  const listRoutesPresenter = new ListRoutesPresenter(L);
  const listRoutes = new ListRoutes(routesRepository, listRoutesPresenter);

  await listRoutes.exec();
}
