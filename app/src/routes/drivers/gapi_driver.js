export default class GapiDriver {
  constructor(api, config) {
    this._api = api;
    this._config = config;
  }

  async loadRoutesData() {
    const routesData = await this._loadData('routes');
    const chunksData = await this._loadData('gpx_chunks');
    const gpxData = chunksData.map(chunks => ({ id: chunks.shift(), gpx: chunks.join('') }));

    return routesData.map(routeData => {
      const id = routeData[0];
      const track = gpxData.find(gpx => gpx.id === id).gpx;

      return {
        id: id,
        name: routeData[1],
        elevation: routeData[2],
        distance: routeData[3],
        time: routeData[4],
        references: routeData[5],
        difficulty: routeData[7],
        color: routeData[8],
        notes: routeData[9],
        track: track,
      };
    });
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
