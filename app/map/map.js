export const MapModule = {
  map: undefined,
  init: function (leaflet, mapElement, config) {
    mapElement.style.height = '100%';
    mapElement.style.width = '100%';

    const mapElementId = mapElement.getAttribute('id');
    this.map = leaflet.map(mapElementId);
    this.map.setView(config.startView.latlng, config.startView.zoom);
    leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/outdoors-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.map);
  }
};
