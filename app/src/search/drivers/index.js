export default class Index {
  constructor() {
    this._index = [];
  }

  reset() {
    this._index = [];
  }

  add(value) {
    this._index.push(value);
  }

  search(criteria) {
    return this._index
      .filter(
        value => criteria.reduce(
          (acc, criterium) => acc && criterium.compare(value[criterium.field], criterium.value),
          true
        )
      )
      .map(value => value.id);
  }
}
