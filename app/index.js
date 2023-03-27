import config from './config.js';

import Api from './lib/api.js';
import Dispatcher from './lib/dispatcher.js';
import WebEventFactory from './lib/web_event_factory.js';

import AuthProvider from './src/auth/provider.js';
import RoutesRepositoryProvider from './src/routes_repository/provider.js';
import RoutesProvider from './src/routes/provider.js';
import RoutesSearchProvider from './src/routes_search/provider.js';
import GapiProvider from './src/gapi/provider.js';

const api = new Api();
const dispatcher = new Dispatcher(window, new WebEventFactory());

const providers = [
  AuthProvider,
  RoutesRepositoryProvider,
  RoutesProvider,
  RoutesSearchProvider,
  GapiProvider,
];

for (const Provider of providers) {
  const provider = new Provider(config);
  provider.provide(api, dispatcher);
}

dispatcher.register({ listeners: () => ({
  'gapi.inited': () => dispatcher.dispatch('seki.inited'),
}) });
