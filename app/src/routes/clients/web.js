export default class Web {
  constructor(window, service, config) {
    this._window = window;
    this._service = service;
    this._config = config;
    this._routesLayers = [];
  }

  listeners() {
    return {
      'map.loaded': async() => await this._onMapLoaded(),
      'keypress': async(e) => await this._onKeypress(e),
    };
  }

  async _onMapLoaded() {
    await this._index();
  }

  async _onKeypress(event) {
    switch (event.code) {
    case 'KeyS': await this._search(); break;
    }
  }

  async _index() {
    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    const routes = await this._service.index();
    if (this._routesLayers.length === 0) {
      for (const route of routes) {
        const layer = new this._window.L.GPX(route.track, {
          async: true,
          marker_options: {
            startIconUrl: '',
            endIconUrl: '',
            shadowUrl: '',
          },
        }).on('loaded', e => {
          this._routesLayers[route.id] = e.target;
          if (this._routesLayers.length === routes.length) {
            this._window.map._container.style.cursor = defaultCursor;
            this._displayRoutes(routes);
          }
        });
        layer.bindPopup(`<h3>${route.name}</h3>`);
      }
    } else {
      this._window.map._container.style.cursor = defaultCursor;
      this._displayRoutes(routes);
    }
  }

  async _search() {
    const query = prompt('Search');
    const routes = await this._service.search(query);
    this._displayRoutes(routes);
    if (routes.length) {
      this._window.map.fitBounds(this._routesLayers[routes[0].id].getBounds());
    }
  }

  _displayRoutes(routes) {
    this._routesLayers.forEach((layer, id) => {
      if (routes.find(r => r.id === `${id}`)) {
        this._window.map.addLayer(layer);
      } else {
        this._window.map.removeLayer(layer);
      }
    });
  }
}
