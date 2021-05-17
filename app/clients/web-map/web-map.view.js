export class WebMapView {
  constructor (dom, leaflet) {
    this._dom = dom;
    this._leaflet = leaflet;
    this._onMapCreatedListeners = [];
  }

  registerOnMapCreatedListener (listener) {
    this._onMapCreatedListeners.push(listener);
  }

  render (webMapLoadViewModel) {
    const mapElement = this._dom.getElementById('map');
    mapElement.style.height = '100%';
    mapElement.style.width = '100%';

    const map = this._leaflet.map('map');
    for (const listener of this._onMapCreatedListeners) {
      listener(map);
    }
    map.setView(
      webMapLoadViewModel.view.latlng,
      webMapLoadViewModel.view.zoom
    );
    this._leaflet.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      {
        maxZoom: webMapLoadViewModel.maxZoom,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: webMapLoadViewModel.tileLayerId,
        tileSize: 512,
        zoomOffset: -1
      }
    ).addTo(map);
  }
}
