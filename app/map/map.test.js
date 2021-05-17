/* global describe, beforeAll, it, expect */
import { MapModule } from './map.js';

describe('map', () => {
  const mockMapElementId = 'test id';
  const mockStartViewLatLng = 'test latlng';
  const mockStartViewZoom = 'test zoom';

  const MockLeafletMap = {
    setView: function (latlng, zoom) {
      this._latlng = latlng;
      this._zoom = zoom;
    }
  };
  const MockLeafletLayer = {
    addTo: function (map) {
      this._map = map;
    }
  };
  const MockLeafletModule = {
    map: function (elementId) {
      this._mapId = elementId;

      return MockLeafletMap;
    },
    tileLayer: function (url, config) {
      this._layerUrl = url;
      this._layerConfig = config;

      return MockLeafletLayer;
    }
  };
  const MockMapElement = {
    style: {},
    getAttribute: function (name) {
      return name === 'id' ? mockMapElementId : null;
    }
  };
  const MockConfig = {
    startView: {
      latlng: mockStartViewLatLng,
      zoom: mockStartViewZoom
    }
  };

  beforeAll(() => {
    MapModule.init(MockLeafletModule, MockMapElement, MockConfig);
  });

  it('ensures container element has full size', () => {
    expect(MockMapElement.style.height).toBe('100%');
    expect(MockMapElement.style.width).toBe('100%');
  });

  it('creates map and attaches it to map element', () => {
    expect(MockLeafletModule._mapId).toBe(mockMapElementId);
  });

  it('initializes map location and zoom', () => {
    expect(MockLeafletMap._latlng).toBe(mockStartViewLatLng);
    expect(MockLeafletMap._zoom).toBe(mockStartViewZoom);
  });

  it('initializes map layer and attaches it to map', () => {
    expect(MockLeafletModule._layerUrl).toBe('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw');

    const expectedConfig = {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/outdoors-v11',
      tileSize: 512,
      zoomOffset: -1
    };
    expect(MockLeafletModule._layerConfig).toEqual(expectedConfig);

    expect(MockLeafletLayer._map).toBe(MockLeafletMap);
  });

  it('exposes map object', () => {
    expect(MapModule.map).toBe(MockLeafletMap);
  });
});
