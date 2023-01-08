import Route from '../domain/route.js';

export default class GapiRoutesRepository {
  constructor(gapiClient, config) {
    this._gapiClient = gapiClient;
    this._config = config;
  }

  async list() {
    const routesData = await this._load('routes');
    const chunksData = await this._load('gpx_chunks');

    return chunksData.map((chunks, i) => {
      const routeData = routesData[i + 1];
      const track = chunks.join('');

      return new Route(routeData[0], routeData[1], track);
    });
  }

  async _load(range) {
    return (await this._gapiClient.sheets.spreadsheets.values.get({
      spreadsheetId: this._config.spreadsheetId,
      range: range,
    })).result.values;
  }
}
