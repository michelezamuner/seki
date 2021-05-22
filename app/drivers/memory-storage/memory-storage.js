export class MemoryStorage {
  constructor (dispatcher) {
    this._dispatcher = dispatcher;
    this._data = {
      routes: []
    };
  }

  create (context, data) {
    this._data[context].push(data);
    this._dispatcher.dispatch(`app.created.${context}`, data.id);
  }

  findById (context, id) {
    return this._data[context].find(data => data.id === id);
  }

  findRouteByName (name) {
    return this._data.routes.find(r => r.name === name);
  }
}
