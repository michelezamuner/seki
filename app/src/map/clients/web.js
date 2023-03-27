export default class Web {
  constructor(window, dispatcher, config) {
    this._window = window;
    this._dispatcher = dispatcher;
    this._config = config;
    this._leafletLoaded = false;
    this._leafletGpxLoaded = false;
    this._setupDone = false;
  }

  listeners() {
    return {
      'seki.loaded': async() => await this._onSekiLoaded(),
      'map.leaflet_loaded': async() => await this._onLeafletLoaded(),
      'map.leaflet-gpx_loaded': async() => await this._onLeafletGpxLoaded(),
    };
  }

  async _onSekiLoaded() {
    this._addStyle('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css');
    this._addScript(
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js',
      'map.leaflet_loaded'
    );
    this._addScript(
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.5.0/gpx.min.js',
      'map.leaflet-gpx_loaded'
    );
    this._window.document.body.style.margin = 0;
    this._window.document.body.style.padding = 0;
    const map = this._window.document.createElement('div');
    map.id = this._config.map.id;
    map.style.height = '800px';
    map.style.width = '100%';
    map.style.float = 'left';
    this._window.document.body.appendChild(map);
  }

  _onLeafletLoaded() {
    this._leafletLoaded = true;
    if (!this._setupDone && this._leafletGpxLoaded) {
      this._setup();
    }
  }

  _onLeafletGpxLoaded() {
    this._leafletGpxLoaded = true;
    if (!this._setupDone && this._leafletLoaded) {
      this._setup();
    }
  }

  _setup() {
    this._window.map = new this._window.L
      .map(this._config.map.id)
      .setView(this._config.map.center, this._config.map.zoom);

    this._window.L.tileLayer(this._config.map.tileLayer.url, {
      maxZoom: this._config.map.tileLayer.maxZoom,
      attribution: this._config.map.tileLayer.attribution,
      id: this._config.map.tileLayer.id,
      tileSize: this._config.map.tileLayer.tileSize,
      zoomOffset: this._config.map.tileLayer.zoomOffset,
    }).addTo(this._window.map);

    this._setupDone = true;

    this._dispatcher.dispatch('map.loaded');
  }

  _addScript(src, event) {
    const script = this._window.document.createElement('script');
    script.async = false;
    script.defer = false;
    script.setAttribute('src', src);
    script.onload = () => this._dispatcher.dispatch(event);

    this._window.document.body.appendChild(script);
  }

  _addStyle(src) {
    const head = this._window.document.getElementsByTagName('head')[0];
    const link = this._window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = src;
    link.media = 'all';

    head.appendChild(link);
  }
}
