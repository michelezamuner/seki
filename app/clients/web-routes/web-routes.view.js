export class WebRoutesView {
  constructor (dom, leaflet) {
    this._dom = dom;
    this._leaflet = leaflet;
    this._map = null;
  }

  onMapCreated (map) {
    this._map = map;
    this._map.createPane('routes');
    this._map.getPane('routes').style.zIndex = 650;
  }

  render (webRoutesViewModel) {
    if (this._map === null) {
      throw new Error('No map has been set');
    }

    const route = webRoutesViewModel.route;
    const routeLayer = this._leaflet.gpx(
      route.track,
      {
        async: true,
        polyline_options: { pane: 'routes' }
      }
    );
    routeLayer.on('loaded', e => this._map.fitBounds(e.target.getBounds()));
    // @TODO: add box
    routeLayer.addTo(this._map);
  }
}
