export default class RoutesPresenter {
  constructor(ui) {
    this._ui = ui;
  }

  async present(routes) {
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
  }
}
