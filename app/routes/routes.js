export const RoutesModule = {
  _dom: undefined,
  _storage: undefined,
  _map: undefined,
  _config: undefined,
  init: function (dom, modules, config) {
    this._dom = dom;
    this._storage = modules.storage;
    this._map = modules.map;
    this._config = config;

    // TODO: load existing routes
    this._initCreator();
  },
  _initCreator: function () {
    const gpxInput = this._dom.createElement('input');
    gpxInput.classList.add('hidden');
    gpxInput.type = 'file';
    gpxInput.onchange = () => {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        const route = {
          id: undefined,
          name: 'Route name',
          mountains: [],
          gain: 0,
          time: 0,
          track: e.target.result
        };
        this._storage.save('routes', route);
        // TODO: show new route on map
      });
      reader.readAsText(gpxInput.files[0]);
    };
    this._dom.body.appendChild(gpxInput);

    this._dom.addEventListener('command', e => {
      const command = e.detail.trim();
      if (command === 'create route' || command === 'c r') {
        gpxInput.click();
      }
    });
  }
};
