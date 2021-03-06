export class RouteEntity {
  constructor (id, name, track) {
    this._id = id;
    this._name = name;
    this._track = track;
    this._mountains = [];
    this._gain = 0;
    this._time = 0;
  }

  get id () {
    return this._id;
  }

  get name () {
    return this._name;
  }

  set name (name) {
    this._name = name;
  }

  get track () {
    return this._track;
  }

  set track (track) {
    this._track = track;
  }

  get mountains () {
    return this._mountains;
  }

  set mountains (mountains) {
    this._mountains = mountains;
  }

  get gain () {
    return this._gain;
  }

  set gain (gain) {
    this._gain = gain;
  }

  get time () {
    return this._time;
  }

  set time (time) {
    this._time = time;
  }
}
