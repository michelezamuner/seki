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
    return this.findBy(context, 'id', id);
  }

  findBy (context, field, value) {
    return this._data[context].find(r => r[field] === value);
  }
}
