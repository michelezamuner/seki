import { RoutesApiWrite } from './routes-api-write.js';
import { RoutesApiRead } from './routes-api-read.js';
import { RoutesRepository } from '../../domain/routes/routes.repository.js';

export const RoutesApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    const storage = container.get('storage');
    const routesRepository = new RoutesRepository(storage);
    container.bind('api.routes.write', presenter => {
      return new RoutesApiWrite(dispatcher, routesRepository, presenter);
    });

    container.bind('api.routes.read', presenter => {
      return new RoutesApiRead(dispatcher, storage, presenter);
    });

    this._provided = true;
  }
};
