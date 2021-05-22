import { GsheetsStorage } from './gsheets-storage.js';

export const GsheetsStorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    const gsheetsStorage = new GsheetsStorage(dispatcher);
    dispatcher.register('app.create', command => {
      gsheetsStorage.create(command.context, command.data);
    });

    this._provided = true;
  }
};
