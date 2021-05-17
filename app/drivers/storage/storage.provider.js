import { MemoryStorageProvider } from '../memory-storage/memory-storage.provider.js';
import { GsheetsStorageProvider } from '../gsheets-storage/gsheets-storage.provider.js';
import { Storage } from './storage.js';

export const StorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    MemoryStorageProvider.provide(container);
    GsheetsStorageProvider.provide(container);

    const storage = new Storage(
      container.get('storage.memory'),
      container.get('storage.gsheets')
    );
    container.bind('storage', storage);

    this._provided = true;
  }
};
