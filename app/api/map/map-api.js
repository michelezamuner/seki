export class MapApi {
  constructor (config, presenter) {
    this._config = config;
    this._presenter = presenter;
  }

  load () {
    const mapLoadResponse = {
      mapType: this._config.type,
      startView: {
        coordinates: this._config.startView.latlng,
        zoom: this._config.startView.zoom
      },
      maxZoom: this._config.maxZoom
    };
    this._presenter.present(mapLoadResponse);
  }
}
