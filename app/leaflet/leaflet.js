/* global L */
export const LeafletModule = {
  map: function (elementId) {
    return L.map(elementId);
  },
  tileLayer: function (url, config) {
    return L.tileLayer(url, config);
  }
};
