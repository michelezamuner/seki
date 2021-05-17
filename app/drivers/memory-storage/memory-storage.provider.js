import { MemoryStorage } from './memory-storage.js';

export const MemoryStorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    container.bind('storage.memory', MemoryStorage);

    this._provided = true;
  }
};
