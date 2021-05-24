export class GsheetsStorage {
  constructor (dispatcher, gapi) {
    this._dispatcher = dispatcher;
    this._gapi = gapi;
    this._tmpIds = [];
  }

  load (context) {
    this._gapi.load(context, data => {
      console.log(data);
    });
  }

  create (context, data) {
    // @TODO: create route in gsheets
    // const id = this._gapi.nextId(context);
    // console.log(id);
    const mockId = this._tmpIds.length + 1;
    this._tmpIds.push(mockId);
    data.id = mockId;
    this._dispatcher.dispatch(
      'app.created',
      { context: context, data: data }
    );
  }
}
