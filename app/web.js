/* global google, gapi, L */
import GapiRoutesRepository from './framework/gapi_routes_repository.js';
import ListRoutesPresenter from './framework/clients/web/list_routes_presenter.js';
import ListRoutes from './features/list_routes.js';

const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let config;
let tokenClient;
let gapiInited = false;
let gisInited = false;

async function draw() {
  const routesRepository = new GapiRoutesRepository(window.gapi.client, '1UShRn42inpoiWNgBlfQaV6OFtxrbeEXO5bmm1mFNjp4');
  const listRoutesPresenter = new ListRoutesPresenter(L);
  const listRoutes = new ListRoutes(routesRepository, listRoutesPresenter);

  await listRoutes.exec();
}

function login() {
  tokenClient.callback = async(resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    await draw();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

document.addEventListener('gapiLoaded', async() => {
  if (!config) {
    config = (await import('./config.js')).default;
  }
  gapi.load('client', async() => {
    await gapi.client.init({
      apiKey: config.gapi.apiKey,
      discoveryDocs: [DISCOVERY_DOC],
    });
    if (gisInited) {
      login();
    }
    gapiInited = true;
  });
});

document.addEventListener('gisLoaded', async() => {
  if (!config) {
    config = (await import('./config.js')).default;
  }
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: config.gapi.clientId,
    scope: SCOPES,
    callback: '', // defined later
  });
  if (gapiInited) {
    login();
  }
  gisInited = true;
});
