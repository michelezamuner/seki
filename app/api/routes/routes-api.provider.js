import { RoutesApi } from './routes-api.js';

export const RoutesApiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    container.bind('api.routes', RoutesApi);

    this._provided = true;
  }
};
