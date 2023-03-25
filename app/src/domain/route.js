export default class Route {
  constructor(id, name, track) {
    this._id = id;
    this._name = name;
    this._track = track;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get track() {
    return this._track;
  }
}
