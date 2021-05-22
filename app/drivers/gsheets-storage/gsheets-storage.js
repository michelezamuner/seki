export class GsheetsStorage {
  constructor (dispatcher) {
    this._dispatcher = dispatcher;
  }

  create (context, data) {
    // @TODO: create route in gsheets
    const mockId = 1;
    data.id = mockId;
    this._dispatcher.dispatch(
      'app.created',
      { context: context, data: data }
    );
  }
}
