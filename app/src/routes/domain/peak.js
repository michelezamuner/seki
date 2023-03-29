export default class Peak {
  constructor(dto) {
    this._id = dto.id;
    this._name = dto.name;
    this._elevation = dto.elevation;
    this._subSection = dto.subSection;
    this._superGroup = dto.superGroup;
    this._group = dto.group;
    this._subGroup = dto.subGroup;
    this._longitude = dto.longitude;
    this._latitude = dto.latitude;
    this._done = dto.done;
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

  get subSection() {
    return this._subSection;
  }

  get superGroup() {
    return this._superGroup;
  }

  get group() {
    return this._group;
  }

  get subGroup() {
    return this._subGroup;
  }

  get longitude() {
    return this._longitude;
  }

  get latitude() {
    return this._latitude;
  }

  get done() {
    return this._done;
  }
}
