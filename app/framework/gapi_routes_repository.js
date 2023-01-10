import Route from '../domain/route.js';

export default class GapiRoutesRepository {
  constructor(gapiClient, config) {
    this._gapiClient = gapiClient;
    this._config = config;

    this._routes = null;
  }

  async search() {
    if (this._routes === null) {
      await this._load();
    }

    return this._routes;
  }

  async _load() {
    this._routesData = await this._loadRange('routes');
    this._chunksData = await this._loadRange('gpx_chunks');

    this._routes = this._chunksData.map((chunks, i) => {
      const routeData = this._routesData[i + 1];
      const track = chunks.join('');

      return new Route(routeData[0], routeData[1], track);
    });
  }

  async _loadRange(range) {
    return (await this._gapiClient.sheets.spreadsheets.values.get({
      spreadsheetId: this._config.spreadsheetId,
      range: range,
    })).result.values;
  }
}
