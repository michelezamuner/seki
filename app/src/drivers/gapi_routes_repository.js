import Route from '../domain/route.js';

export default class GapiRoutesRepository {
  constructor(config) {
    this._config = config;

    this._routes = null;
  }

  async search(authContext) {
    if (this._routes === null) {
      await this._load(authContext);
    }

    return this._routes;
  }

  async _load(authContext) {
    this._routesData = await this._loadRange(authContext, 'routes');
    this._chunksData = await this._loadRange(authContext, 'gpx_chunks');

    this._routes = this._chunksData.map((chunks, i) => {
      const routeData = this._routesData[i + 1];
      const track = chunks.join('');

      return new Route(routeData[0], routeData[1], track);
    });
  }

  async _loadRange(authContext, range) {
    return (await authContext.client.sheets.spreadsheets.values.get({
      spreadsheetId: this._config.spreadsheetId,
      range: range,
    })).result.values;
  }
}
