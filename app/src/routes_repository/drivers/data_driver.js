export default class DataDriver {
  constructor(config) {
    this._config = config;
  }

  async loadRoutesData(authContext) {
    return await this._loadData(authContext, 'routes');
  }

  async loadGpxData(authContext) {
    const chunksData = await this._loadData(authContext, 'gpx_chunks');

    return chunksData.map(chunks => chunks.join(''));
  }

  async _loadData(authContext, range) {
    const data = (await authContext.client.sheets.spreadsheets.values.get({
      spreadsheetId: this._config.spreadsheetId,
      range: range,
    })).result.values;

    return this._removeHeader(data);
  }

  _removeHeader(data) {
    data.shift();

    return data;
  }
}
