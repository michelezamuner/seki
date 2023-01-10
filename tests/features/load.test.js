import { jest } from '@jest/globals';
import Load from '../../app/features/load.js';

describe('load', () => {
  it('loads', async() => {
    const promise = 'promise';
    const repository = {
      search: () => promise,
    };
    const presenter = {
      present: jest.fn(),
    };

    const load = new Load(repository, presenter);

    await load.exec();

    expect(presenter.present).toBeCalledWith(promise);
  });
});
