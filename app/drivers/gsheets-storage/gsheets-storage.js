export class GsheetsStorage {
  constructor (dispatcher, gapi) {
    this._dispatcher = dispatcher;
    this._gapi = gapi;
  }

  generateId (context) {
    return this._gapi.nextId(context);
  }

  load (context) {
    this._gapi.load(context, data => {
      console.log(data);
    });
  }

  create (context, entity) {
    // @TODO: create route in gsheets
    this._gapi.save(context, entity, () => {
      this._dispatcher.dispatch('app.created', { context: context, data: entity });
    });
  }
}
