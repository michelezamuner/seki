import { GapiProvider } from '../../frameworks/gapi/gapi.provider.js';
import { GsheetsStorage } from './gsheets-storage.js';

export const GsheetsStorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    GapiProvider.provide(container);

    const dispatcher = container.get('dispatcher');
    dispatcher.register('gapi', gapi => {
      const gsheetsStorage = new GsheetsStorage(dispatcher, gapi);
      dispatcher.register('app.create', command => {
        gsheetsStorage.create(command.context, command.data);
      });
    });

    this._provided = true;
  }
};
