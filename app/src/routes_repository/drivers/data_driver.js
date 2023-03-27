export default class DataDriver {
  constructor(authDriver, config) {
    this._authDriver = authDriver;
    this._config = config;
  }

  async loadRoutesData(user) {
    const authContext = this._authDriver.authContext(user);

    return await this._loadData(authContext, 'routes');
  }

  async loadGpxData(user) {
    const authContext = this._authDriver.authContext(user);
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
