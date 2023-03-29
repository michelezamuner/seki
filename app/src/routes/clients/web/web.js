import RouteBox from './route_box.js';
import PeakBox from './peak_box.js';

export default class Web {
  constructor(window, service, config) {
    this._window = window;
    this._service = service;
    this._config = config;
    this._routesLayers = [];
    this._peaksLayers = [];
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
    case 'KeyI': await this._index(); break;
    case 'KeyS': await this._search(); break;
    case 'KeyU': await this._update(); break;
    }
  }

  async _index() {
    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    this._clearLayers();
    await this._service.update();
    const routes = await this._service.index();

    if (this._routesLayers.length === 0) {
      for (const route of routes) {
        const routeLayer = new this._window.L.GPX(route.track, {
          async: true,
          marker_options: {
            startIconUrl: '',
            endIconUrl: '',
            shadowUrl: '',
          },
        }).on('loaded', e => {
          e.target.setStyle({ color: route.color });
          this._routesLayers[route.id] = e.target;

          for (const peak of route.peaks) {
            const peakLayer = this._window.L.marker([peak.longitude, peak.latitude], { opacity: peak.done ? 1.0 : 0.3 });
            const peakBox = new PeakBox(peak);
            peakLayer.bindPopup(peakBox.render());
            this._peaksLayers[peak.id] = peakLayer;
          }

          if (this._routesLayers.length === routes.length) {
            this._window.map._container.style.cursor = defaultCursor;
            this._displayRoutes(routes);
          }
        });
        const routeBox = new RouteBox(route);
        routeLayer.bindPopup(routeBox.render());
      }
    } else {
      this._window.map._container.style.cursor = defaultCursor;
      this._displayRoutes(routes);
    }
  }

  async _search() {
    const query = prompt('Search');
    if (!query) {
      return;
    }
    const routes = await this._service.search(query);
    this._displayRoutes(routes);
    if (routes.length) {
      this._window.map.fitBounds(this._routesLayers[routes[0].id].getBounds());
    }
    alert(`Trovati ${routes.length} itinerari`);
  }

  async _update() {
    await this._index();
  }

  _displayRoutes(routes) {
    this._routesLayers.forEach((layer, id) => {
      if (routes.find(r => r.id === id)) {
        this._window.map.addLayer(layer);
      } else {
        this._window.map.removeLayer(layer);
      }
    });

    const peaks = routes.flatMap(route => route.peaks);
    this._peaksLayers.forEach((layer, id) => {
      if (peaks.find(p => p.id === id)) {
        this._window.map.addLayer(layer);
      } else {
        this._window.map.removeLayer(layer);
      }
    });
  }

  _clearLayers() {
    for (const layer of this._routesLayers) {
      if (this._window.map.hasLayer(layer)) {
        this._window.map.removeLayer(layer);
      }
    }

    for (const layer of this._peaksLayers) {
      if (this._window.map.hasLayer(layer)) {
        this._window.map.removeLayer(layer);
      }
    }

    this._routesLayers = [];
    this._peaksLayers = [];
  }
}
