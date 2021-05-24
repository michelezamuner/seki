export class GsheetsStorage {
  constructor (dispatcher, gapi) {
    this._dispatcher = dispatcher;
    this._gapi = gapi;
    // this._tmpIds = [];
  }

  load (context) {
    this._gapi.load(context, data => {
      console.log(data);
    });
  }

  create (context, entity) {
    // @TODO: create route in gsheets
    // const mockId = this._tmpIds.length + 1;
    // this._tmpIds.push(mockId);
    entity.id = this._gapi.nextId(context);
    this._gapi.save(context, entity, () => {
      this._dispatcher.dispatch('app.created', { context: context, data: entity });
    });
  }
}
