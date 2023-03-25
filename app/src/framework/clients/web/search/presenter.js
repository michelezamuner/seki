export default class Presenter  {
  constructor(dispatcher) {
    this._dispatcher = dispatcher;
  }

  presentInput() {
    this._dispatcher.dispatch('search_query', { query: prompt('Search') });
  }
}
