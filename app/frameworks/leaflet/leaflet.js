/* global L */
export const Leaflet = {
  map: function (elementId) {
    return L.map(elementId);
  },
  tileLayer: function (url, config) {
    return L.tileLayer(url, config);
  },
  control: function (config) {
    return L.Control.extend(config);
  },
  gpx: function (track, config) {
    return new L.GPX(track, config);
  }
};
