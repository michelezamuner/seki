export default class Web {
  constructor(window, service, config) {
    this._window = window;
    this._service = service;
    this._config = config;
  }

  listeners() {
    return {
      'map.loaded': async() => await this._onMapLoaded(),
    };
  }

  async _onMapLoaded() {
    await this._index();
  }

  async _index() {
    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    const routes = await this._service.index();
    for (const route of routes) {
      const layer = new this._window.L.GPX(route.track, {
        async: true,
        marker_options: {
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl: '',
        },
      });
      layer.bindPopup(`<h3>${route.name}</h3>`);
      layer.addTo(this._window.map);
    }

    this._window.map._container.style.cursor = defaultCursor;
  }
}
