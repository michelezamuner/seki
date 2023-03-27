export default class Route {
  constructor(data, track) {
    this._data = data;
    this._track = track;
  }

  get data() {
    return this._data;
  }

  get track() {
    return this._track;
  }
}
