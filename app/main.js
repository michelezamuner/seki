import { Container } from './lib/container/container.js';
import { Dispatcher } from './lib/dispatcher/dispatcher.js';
import { config } from './config.js';

import { MapApiProvider } from './api/map/map-api.provider.js';
import { RoutesApiProvider } from './api/routes/routes-api.provider.js';

import { WebMapProvider } from './clients/web-map/web-map.provider.js';
import { WebPaletteProvider } from './clients/web-palette/web-palette.provider.js';
import { WebRoutesProvider } from './clients/web-routes/web-routes.provider.js';

import { GsheetsStorageProvider } from './drivers/gsheets-storage/gsheets-storage.provider.js';
import { MemoryStorageProvider } from './drivers/memory-storage/memory-storage.provider.js';

Container.bind('dispatcher', Dispatcher);
Container.bind('config.map', config.map);
Container.bind('config.palette', config.palette);

GsheetsStorageProvider.provide(Container);
MemoryStorageProvider.provide(Container);

MapApiProvider.provide(Container);
RoutesApiProvider.provide(Container);

WebMapProvider.provide(Container);
WebPaletteProvider.provide(Container);
WebRoutesProvider.provide(Container);
