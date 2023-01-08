/* global gapi, google */

export default class Gapi {
  constructor(dom, config) {
    this._dom = dom;
    this._config = config;
    this._gapiInited = false;
    this._gisInited = false;
    this._tokenClient = null;
  }

  setup(callback) {
    this._addScript(
      'https://apis.google.com/js/api.js',
      async() => {
        gapi.load('client', async() => {
          await gapi.client.init({
            apiKey: this._config.apiKey,
            discoveryDocs: [this._config.discoveryDoc],
          });
          if (this._gisInited) {
            this._login(callback);
          }
          this._gapiInited = true;
        });
      }
    );

    this._addScript(
      'https://accounts.google.com/gsi/client',
      async() => {
        this._tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: this._config.clientId,
          scope: this._config.scopes,
          callback: '',
        });
        if (this._gapiInited) {
          this._login(callback);
        }
        this._gisInited = true;
      }
    );
  }

  _login(callback) {
    this._tokenClient.callback = async(resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await callback();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      this._tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      this._tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  _addScript(src, onload, async = true, defer = true) {
    const script = this._dom.createElement('script');
    script.async = async;
    script.defer = defer;
    script.setAttribute('src', src);
    script.onload = onload;

    this._dom.body.appendChild(script);
  }
}
