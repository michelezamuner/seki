export default class Route {
  constructor(dto) {
    this._id = dto.id;
    this._name = dto.name;
    this._elevation = dto.elevation;
    this._distance = dto.distance;
    this._time = dto.time;
    this._references = dto.references;
    this._difficulty = dto.difficulty;
    this._color = dto.color;
    this._notes = dto.notes;
    this._track = dto.track;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get elevation() {
    return this._elevation;
  }

  get distance() {
    return this._distance;
  }

  get time() {
    return this._time;
  }

  get references() {
    return this._references;
  }

  get difficulty() {
    return this._difficulty;
  }

  get color() {
    return this._color;
  }

  get notes() {
    return this._notes;
  }

  get track() {
    return this._track;
  }
}
