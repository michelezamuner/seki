import { jest } from '@jest/globals';
import LoadRoutes from '../../app/features/load_routes.js';

describe('load routes', () => {
  it('loads routes', async() => {
    const promise = 'promise';
    const repository = {
      load: () => promise,
    };
    const presenter = {
      present: jest.fn(),
    };

    const loadRoutes = new LoadRoutes(repository, presenter);

    await loadRoutes.exec();

    expect(presenter.present).toBeCalledWith(promise);
  });
});
