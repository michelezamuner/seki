export class RoutesService {
  constructor (routesRepository, routesFactory) {
    this._routesRepository = routesRepository;
    this._routesFactory = routesFactory;
  }

  createRoute (name, track) {
    if (this._routesRepository.findByName(name)) {
      throw new Error('Duplicated route');
    }

    return this._routesFactory.create(name, track);
  }
}
