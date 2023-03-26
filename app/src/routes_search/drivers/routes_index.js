export default class RoutesIndex {
  constructor() {
    this._index = [];
    this._isLocked = false;
  }

  get isLocked() {
    return this._isLocked;
  }

  lock() {
    this._isLocked = true;
  }

  update(route) {
    this._index.push(route);
  }

  unlock() {
    this._isLocked = false;
  }

  search(criteria) {
    // @todo
    return criteria;
  }
}
