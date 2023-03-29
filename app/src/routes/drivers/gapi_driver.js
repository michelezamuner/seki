export default class GapiDriver {
  constructor(api, config) {
    this._api = api;
    this._config = config;
  }

  async loadRoutesData() {
    const routesData = await this._loadData('routes');
    const chunksData = await this._loadData('gpx_chunks');
    const gpxData = chunksData.map(chunks => ({ id: chunks.shift(), gpx: chunks.join('') }));
    const peaksData = await this._loadData('peaks');

    return routesData.map(routeData => {
      const id = routeData[0];
      const track = gpxData.find(gpx => gpx.id === id).gpx;

      const peaksIds = routeData[6].split(',').map(id => id.trim());
      const peaks = peaksData
        .filter(peak => peaksIds.includes(peak[0]))
        .map(peak => ({
          id: parseInt(peak[0]),
          name: peak[1],
          elevation: parseInt(peak[2]),
          subSection: peak[3],
          superGroup: peak[4],
          group: peak[5],
          subGroup: peak[6],
          longitude: Number.parseFloat(peak[7]),
          latitude: Number.parseFloat(peak[8]),
          done: peak[9] === 'si',
        }));

      return {
        id: parseInt(id),
        name: routeData[1],
        elevation: parseInt(routeData[2]),
        distance: Number.parseFloat(routeData[3]),
        time: routeData[4],
        references: routeData[5] ? routeData[5].split('\n') : [],
        peaks: peaks,
        difficulty: routeData[7],
        color: routeData[8],
        notes: routeData[9] || '',
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
