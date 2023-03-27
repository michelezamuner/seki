export default class Route {
  constructor(user, data, track) {
    this._user = user;
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
