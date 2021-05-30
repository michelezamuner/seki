import { RoutesApiWrite } from './routes-api-write.js';
import { RoutesApiRead } from './routes-api-read.js';
import { RoutesRepository } from '../../domain/routes/routes.repository.js';
import { RoutesFactory } from '../../domain/routes/routes.factory.js';
import { RoutesService } from '../../domain/routes/routes.service.js';

export const RoutesApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    dispatcher.register(['storage.read', 'app.idGenerator'], (readStorage, idGenerator) => {
      dispatcher.dispatch('api.routes.write', presenter => {
        const routesRepository = new RoutesRepository(readStorage);
        const routesFactory = new RoutesFactory(idGenerator);
        const routesService = new RoutesService(routesRepository, routesFactory);

        return new RoutesApiWrite(dispatcher, routesService, presenter);
      });
      dispatcher.dispatch('api.routes.read', presenter => {
        return new RoutesApiRead(dispatcher, readStorage, presenter);
      });
    });

    this._provided = true;
  }
};
