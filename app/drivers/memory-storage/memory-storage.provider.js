import { MemoryStorage } from './memory-storage.js';

export const MemoryStorageProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    const memoryStorage = new MemoryStorage(dispatcher);
    dispatcher.register('app.created', event => {
      memoryStorage.create(event.context, event.data);
    });
    dispatcher.dispatch('storage.read', memoryStorage);

    this._provided = true;
  }
};
