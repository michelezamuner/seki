export class GsheetsStorage {
  constructor (dispatcher) {
    this._dispatcher = dispatcher;
    this._tmpIds = [];
  }

  create (context, data) {
    // @TODO: create route in gsheets
    const mockId = this._tmpIds.length + 1;
    this._tmpIds.push(mockId);
    data.id = mockId;
    this._dispatcher.dispatch(
      'app.created',
      { context: context, data: data }
    );
  }
}
