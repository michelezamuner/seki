import config from './config.js';

import Api from './lib/api.js';
import Dispatcher from './lib/dispatcher.js';
import WebEventFactory from './lib/web_event_factory.js';

import RoutesProvider from './src/routes/provider.js';
import SearchProvider from './src/search/provider.js';
import GapiProvider from './src/gapi/provider.js';
import SekiProvider from './src/seki/provider.js';
import MapProvider from './src/map/provider.js';

const api = new Api();
const dispatcher = new Dispatcher(window, new WebEventFactory());

const providers = [
  RoutesProvider,
  SearchProvider,
  GapiProvider,
  SekiProvider,
  MapProvider,
];

for (const Provider of providers) {
  const provider = new Provider(config);
  provider.provide(api, dispatcher);
}

dispatcher.register({ listeners: () => ({
  'gapi.inited': () => dispatcher.dispatch('seki.inited'),
}) });
