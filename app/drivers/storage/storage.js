export class Storage {
  constructor (memoryStorage, persistentStorage) {
    this._memoryStorage = memoryStorage;
    this._persistentStorage = persistentStorage;
  }

  findRouteByName (name) {
    return this._memoryStorage.findRouteByName(name);
  }
}
