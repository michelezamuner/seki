import Route from '../domain/route.js';

export default class GapiRoutesRepository {
  constructor(gapiClient, config) {
    this._gapiClient = gapiClient;
    this._config = config;

    this._routes = [];
  }

  async load() {
    this._routesData = await this._load('routes');
    this._chunksData = await this._load('gpx_chunks');

    this._routes = this._chunksData.map((chunks, i) => {
      const routeData = this._routesData[i + 1];
      const track = chunks.join('');

      return new Route(routeData[0], routeData[1], track);
    });
  }

  async list() {
    return this._routes;
  }

  async _load(range) {
    return (await this._gapiClient.sheets.spreadsheets.values.get({
      spreadsheetId: this._config.spreadsheetId,
      range: range,
    })).result.values;
  }
}
