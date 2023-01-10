export default class Ui {
  constructor(context, dom, leaflet, config) {
    this._context = null;
    this._dom = null;
    this._leaflet = null;
    this._config = null;
    this._map = null;

    this._setup(context, dom, leaflet, config);
  }

  dispatch(event, data) {
    this._context.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  get leaflet() {
    return this._leaflet;
  }

  get map() {
    return this._map;
  }

  _setup(context, dom, leaflet, config) {
    const map = new leaflet.map('map').setView(config.map.center, config.map.zoom);

    leaflet.tileLayer(config.map.tileLayer.url, {
      maxZoom: config.map.tileLayer.maxZoom,
      attribution: config.map.tileLayer.attribution,
      id: config.map.tileLayer.id,
      tileSize: config.map.tileLayer.tileSize,
      zoomOffset: config.map.tileLayer.zoomOffset,
    }).addTo(map);

    this._context = context;
    this._dom = dom;
    this._leaflet = leaflet;
    this._config = config;
    this._map = map;
  }
}
