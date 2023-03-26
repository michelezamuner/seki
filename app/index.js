import config from './config.js';

import Api from './lib/api.js';
import Dispatcher from './lib/dispatcher.js';
import WebEventFactory from './lib/web_event_factory.js';

import AuthProvider from './src/auth/provider.js';
import RoutesRepositoryProvider from './src/routes_repository/provider.js';
import RoutesProvider from './src/routes/provider.js';
import RoutesSearchProvider from './src/routes_search/provider.js';

const api = new Api();
const dispatcher = new Dispatcher(window, new WebEventFactory());

dispatcher.register(null, { listeners: () => ({ DOMContentLoaded: () => {
  const providers = [
    AuthProvider,
    RoutesRepositoryProvider,
    RoutesProvider,
    RoutesSearchProvider,
  ];

  for (const Provider of providers) {
    const provider = new Provider(config);
    provider.provide(api, dispatcher);
  }
} }) });
