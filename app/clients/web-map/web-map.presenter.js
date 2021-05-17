export class WebMapPresenter {
  constructor (webMapView) {
    this._webMapView = webMapView;
  }

  present (mapLoadResponse) {
    const webMapLoadViewModel = {
      tileLayerId: mapLoadResponse.mapType,
      view: {
        latlng: mapLoadResponse.startView.coordinates,
        zoom: mapLoadResponse.startView.zoom
      },
      maxZoom: mapLoadResponse.maxZoom
    };
    this._webMapView.render(webMapLoadViewModel);
  }
}
