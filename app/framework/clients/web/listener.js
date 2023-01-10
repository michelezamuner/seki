export default class Listener {
  constructor(context, router) {
    this._context = context;
    this._router = router;
  }

  async start() {
    const request = { route: '/', params: {} };

    await this._router.route(request);

    this._context.addEventListener('keypress', async e => {
      let request = null;
      switch(e.code) {
      case 'KeyS': request = { route: '/search/input', params: {} }; break;
      }

      await this._router.route(request);
    });

    this._context.addEventListener('searchInput', async e => {
      const request = { route: '/search/query', params: { query: e.detail } };

      await this._router.route(request);
    });
  }
}
