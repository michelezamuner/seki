export default class GapiDriver {
  constructor(api, config) {
    this._api = api;
    this._config = config;
  }

  async loadRoutesData() {
    return await this._loadData('routes');
  }

  async loadGpxData() {
    const chunksData = await this._loadData('gpx_chunks');

    return chunksData.map(chunks => chunks.join(''));
  }

  async _loadData(range) {
    const response = await this._api.get('app://gapi/sheets', {
      sheetId: this._config.spreadsheetId,
      range: range,
    });
    if (response.state === 'error') {
      throw response.data.reason;
    }

    const data = response.data.values;

    return this._removeHeader(data);
  }

  _removeHeader(data) {
    data.shift();

    return data;
  }
}
