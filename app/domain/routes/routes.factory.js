import { RouteEntity } from './route.entity.js';

export class RoutesFactory {
  constructor (idGenerator) {
    this._idGenerator = idGenerator;
  }

  create (name, track) {
    const id = this._idGenerator.generateId();

    return new RouteEntity(id, name, track);
  }
}
