import { jest } from '@jest/globals';
import ListRoutes from '../../app/features/list_routes.js';

describe('list routes', () => {
  it('list routes', async() => {
    const promise = 'promise';
    const repository = {
      list: () => promise,
    };
    const presenter = {
      present: jest.fn(),
    };

    const listRoutes = new ListRoutes(repository, presenter);

    await listRoutes.exec();

    expect(presenter.present).toBeCalledWith(promise);
  });
});
