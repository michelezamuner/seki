import RouteBox from './route_box.js';
import PeakBox from './peak_box.js';

export default class Web {
  constructor(window, service, config) {
    this._window = window;
    this._service = service;
    this._config = config;
    this._routesLayers = [];
    this._peaksLayers = [];
    this._gpxReader = new FileReader();
    this._gpxElement = null;
  }

  listeners() {
    return {
      'map.loaded': async() => await this._onMapLoaded(),
      'keypress': async(e) => await this._onKeypress(e),
      'load': [
        async(e) => await this._onGpxLoaded(e),
        this._gpxReader,
      ],
    };
  }

  async _onMapLoaded() {
    this._setupGpx();
    await this._index();
  }

  _setupGpx() {
    this._gpxElement = document.createElement('input');
    this._gpxElement.setAttribute('type', 'file');
    this._gpxElement.onchange = e => {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this._gpxReader.readAsText(file, 'UTF-8');
    };
  }

  async _onKeypress(event) {
    switch (event.code) {
    case 'KeyG': this._gpx(); break;
    case 'KeyI': await this._index(); break;
    case 'KeyS': await this._search(); break;
    case 'KeyU': await this._update(); break;
    }
  }

  async _onGpxLoaded(event) {
    const gpx = event.target.result;
    const routeId = parseInt(prompt('ID itinerario:'));
    if (!routeId) {
      return;
    }

    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    await this._service.gpx({
      id: routeId,
      track: gpx,
    });

    this._clearLayers();
    await this._service.update();
    const routes = await this._service.index();

    this._buildLayers(routes, routes => {
      this._displayRoutes([routes.find(route => route.id === routeId)], true);
      this._window.map._container.style.cursor = defaultCursor;
    });
  }

  _gpx() {
    this._gpxElement.click();
  }

  async _index() {
    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    const routes = await this._service.index();

    if (this._routesLayers.length === 0) {
      this._buildLayers(routes, routes => {
        this._displayRoutes(routes);
        this._window.map._container.style.cursor = defaultCursor;
      });
    } else {
      this._displayRoutes(routes);
      this._window.map._container.style.cursor = defaultCursor;
    }
  }

  async _search() {
    const query = prompt('Ricerca');
    if (!query) {
      return;
    }

    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    const routes = await this._service.search(query);
    alert(`Trovati ${routes.length} itinerari`);
    if (routes.length === 0) {
      this._window.map._container.style.cursor = defaultCursor;

      return;
    }

    this._displayRoutes(routes, true);

    this._window.map._container.style.cursor = defaultCursor;
  }

  async _update() {
    const defaultCursor = this._window.map._container.style.cursor;
    this._window.map._container.style.cursor = 'wait';

    const currentlyDisplayedRoutesIds = this._routesLayers
      .filter(({ layer: layer }) => this._window.map.hasLayer(layer))
      .map(({ id: id }) => id);

    this._clearLayers();
    await this._service.update();
    const routes = await this._service.index();

    this._buildLayers(routes, routes => {
      const currentlyDisplayedRoutes = routes.filter(route => currentlyDisplayedRoutesIds.includes(route.id));
      this._displayRoutes(currentlyDisplayedRoutes);
      this._window.map._container.style.cursor = defaultCursor;
    });
  }

  _displayRoutes(routes, center = false) {
    this._routesLayers.forEach(({ id: id, layer: layer }) => {
      if (routes.find(r => r.id === id)) {
        this._window.map.addLayer(layer);
      } else {
        this._window.map.removeLayer(layer);
      }
    });

    const peaks = routes.flatMap(route => route.peaks);
    this._peaksLayers.forEach(({ id: id, layer: layer }) => {
      if (peaks.find(p => p.id === id)) {
        this._window.map.addLayer(layer);
      } else {
        this._window.map.removeLayer(layer);
      }
    });

    if (center) {
      this._window.map.fitBounds(
        this._routesLayers
          .find(item => item.id === routes[0].id)
          .layer
          .getBounds());
    }
  }

  _buildLayers(routes, callback) {
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
        this._routesLayers.push({ id: route.id, layer: e.target });

        for (const peak of route.peaks) {
          const peakLayer = this._window.L.marker([peak.longitude, peak.latitude], { opacity: peak.done ? 1.0 : 0.3 });
          const peakBox = new PeakBox(peak);
          peakLayer.bindPopup(peakBox.render());
          this._peaksLayers.push({ id: peak.id, layer: peakLayer });
        }

        if (this._routesLayers.length === routes.length) {
          callback(routes);
        }
      });
      const routeBox = new RouteBox(route);
      routeLayer.bindPopup(routeBox.render());
    }
  }

  _clearLayers() {
    for (const { layer: layer } of this._routesLayers) {
      if (this._window.map.hasLayer(layer)) {
        this._window.map.removeLayer(layer);
      }
    }

    for (const { layer: layer } of this._peaksLayers) {
      if (this._window.map.hasLayer(layer)) {
        this._window.map.removeLayer(layer);
      }
    }

    this._routesLayers = [];
    this._peaksLayers = [];
  }
}
