import { GsheetsStorage } from './gsheets-storage.js';

export const GsheetsStorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    container.bind('storage.gsheets', GsheetsStorage);

    this._provided = true;
  }
};
