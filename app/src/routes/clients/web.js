export default class Web {
  constructor(dom, leaflet, config, service) {
    this._dom = dom;
    this._leaflet = leaflet;
    this._config = config;
    this._map = null;
    this._service = service;
  }

  listeners() {
    return {
      'seki.inited': async() => await this._onLoad(),
    };
  }

  async _onLoad() {
    await this._service.login();

    this._map = this._setup();

    await this._index();
  }

  async _index() {
    this._map._container.classList.add('cursor-wait');

    const routes = await this._service.index();
    for (const route of routes) {
      const layer = new this._leaflet.GPX(route.track, {
        async: true,
        marker_options: {
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl: '',
        },
      });
      layer.bindPopup(`<h3>${route.name}</h3>`);
      layer.addTo(this._map);
    }

    this._map._container.classList.remove('cursor-wait');
  }

  _setup() {
    const map = new this._leaflet
      .map(this._config.map.id)
      .setView(this._config.map.center, this._config.map.zoom);

    this._leaflet.tileLayer(this._config.map.tileLayer.url, {
      maxZoom: this._config.map.tileLayer.maxZoom,
      attribution: this._config.map.tileLayer.attribution,
      id: this._config.map.tileLayer.id,
      tileSize: this._config.map.tileLayer.tileSize,
      zoomOffset: this._config.map.tileLayer.zoomOffset,
    }).addTo(map);

    return map;
  }
}
