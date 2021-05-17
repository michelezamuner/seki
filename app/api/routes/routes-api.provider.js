import { RoutesApiWrite } from './routes-api-write.js';
import { RoutesRepository } from '../../domain/routes/routes.repository.js';

export const RoutesApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');
    const routesRepository = new RoutesRepository();
    container.bind('api.routes.write', errorPresenter => {
      return new RoutesApiWrite(dispatcher, routesRepository, errorPresenter);
    });

    this._provided = true;
  }
};
