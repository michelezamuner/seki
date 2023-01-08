export default class ListRoutesPresenter {
  constructor(leaflet) {
    this._setup(leaflet);
  }

  async present(routesPromise) {
    this._map._container.classList.remove('leaflet-grab');
    this._map._container.classList.add('cursor-wait');

    const routes = await routesPromise;

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
    this._map._container.classList.add('leaflet-grab');
  }

  _setup(leaflet) {
    this._map = new leaflet.map('map').setView([45.9741, 12.3095], 12);

    leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/outdoors-v11',
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(this._map);

    this._leaflet = leaflet;
  }
}
