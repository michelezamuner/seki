import ListRoutes from '../../app/features/list_routes.js';

describe('list routes', () => {
  it('list routes', async() => {
    const routes = ['route1', 'route2'];
    const routesRepository = {
      list: async() => {
        return new Promise(resolve => resolve(routes));
      },
    };
    const listRoutes = new ListRoutes(routesRepository);

    const actualRoutes = await listRoutes.exec();

    expect(actualRoutes).toBe(routes);
  });
});
