export default class Service {
  constructor(browser, dispatcher, config) {
    this._browser = browser;
    this._dispatcher = dispatcher;
    this._config = config;
    this._gapiInited = false;
    this._gsiInited = false;
    this._tokenClient = null;
  }

  load() {
    this._browser.setup();
  }

  async initGapi() {
    this._browser.gapi.load('client', async() => {
      await this._browser.gapi.client.init({
        apiKey: this._config.apiKey,
        discoveryDocs: this._config.discoveryDocs,
      });
      this._gapiInited = true;
      if (this._gsiInited) {
        this._dispatcher.dispatch('gapi.inited');
      }
    });
  }

  async initGsi() {
    this._tokenClient = this._browser.google.accounts.oauth2.initTokenClient({
      client_id: this._config.clientId,
      scope: this._config.scopes,
      callback: '',
    });
    this._gsiInited = true;
    if (this._gapiInited) {
      this._dispatcher.dispatch('gapi.inited');
    }
  }

  async login() {
    return new Promise(resolve => {
      this._tokenClient.callback = async(resp) => {
        if (resp.error !== undefined) {
          throw (resp);
        }

        await resolve();
      };

      if (this._browser.gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        this._tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        this._tokenClient.requestAccessToken({ prompt: '' });
      }
    });
  }

  async sheets(sheetId, range) {
    const data = await this._browser.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: range,
    });

    return data.result.values;
  }
}
