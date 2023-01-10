import { jest } from '@jest/globals';
import Load from '../../app/features/load.js';

describe('load', () => {
  it('loads', async() => {
    const authContext = 'authContext';
    const promise = 'promise';
    const repository = {
      search: _authContext => _authContext === authContext ? promise : null,
    };
    const presenter = {
      present: jest.fn(),
    };

    const load = new Load(repository, presenter);

    await load.exec(authContext);

    expect(presenter.present).toBeCalledWith(promise);
  });
});
