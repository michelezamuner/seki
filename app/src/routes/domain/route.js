export default class Route {
  constructor(dto) {
    this._id = dto.id;
    this._name = dto.name;
    this._track = dto.track;
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
