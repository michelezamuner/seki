export class WebRoutesView {
  constructor (dom, leaflet) {
    this._dom = dom;
    this._leaflet = leaflet;
    this._map = null;
  }

  onMapCreated (map) {
    this._map = map;
  }

  render (webRoutesViewModel) {
    if (this._map === null) {
      throw new Error('No map has been set');
    }

    const route = webRoutesViewModel.route;
    // @TODO: add route to pane
    const routeLayer = this._leaflet.gpx(route.track, { async: true });
    routeLayer.on('loaded', e => this._map.fitBounds(e.target.getBounds()));
    // @TODO: add box
    routeLayer.addTo(this._map);
  }
}
