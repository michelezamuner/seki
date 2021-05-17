export class WebMapController {
  constructor (mapApi) {
    this._mapApi = mapApi;
  }

  load () {
    this._mapApi.load();
  }
}
