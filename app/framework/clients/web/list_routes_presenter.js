export default class ListRoutesPresenter {
  constructor(ui) {
    this._ui = ui;
  }

  async present(routesPromise) {
    this._ui.map._container.classList.remove('leaflet-grab');
    this._ui.map._container.classList.add('cursor-wait');

    const routes = await routesPromise;

    for (const route of routes) {
      const layer = new this._ui.leaflet.GPX(route.track, {
        async: true,
        marker_options: {
          startIconUrl: '',
          endIconUrl: '',
          shadowUrl: '',
        },
      });
      layer.bindPopup(`<h3>${route.name}</h3>`);
      layer.addTo(this._ui.map);
    }

    this._ui.map._container.classList.remove('cursor-wait');
    this._ui.map._container.classList.add('leaflet-grab');
  }
}
