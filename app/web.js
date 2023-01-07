/* global google, gapi, L */

const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let config;
let tokenClient;
let gapiInited = false;
let gisInited = false;

async function draw() {
  const routesData = (await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1UShRn42inpoiWNgBlfQaV6OFtxrbeEXO5bmm1mFNjp4',
    range: 'routes',
  })).result.values;
  const chunksData = (await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1UShRn42inpoiWNgBlfQaV6OFtxrbeEXO5bmm1mFNjp4',
    range: 'gpx_chunks',
  })).result.values;

  for (const [i, chunks] of chunksData.entries()) {
    const name = routesData[i + 1][1];
    const box = `<h3>${name}</h3>`;
    const gpx = chunks.join('');
    const layer = new L.GPX(gpx, {
      async: true,
      marker_options: {
        startIconUrl: '',
        endIconUrl: '',
        shadowUrl: '',
      },
    });
    layer.bindPopup(box);
    layer.addTo(window.map);
  }

  document.getElementById('map').style.cursor='move';
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
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
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

window.map = new L.map('map').setView([45.9741, 12.3095], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/outdoors-v11',
  tileSize: 512,
  zoomOffset: -1,
}).addTo(window.map);
