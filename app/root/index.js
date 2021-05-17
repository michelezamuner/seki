import { config } from '../config.js';
import { StorageModule } from '../storage/storage.js';
import { LeafletModule } from '../leaflet/leaflet.js';
import { MapModule } from '../map/map.js';
import { PaletteModule } from '../palette/palette.js';
import { RoutesModule } from '../routes/routes.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  MapModule.init(LeafletModule, app, config.map);
  PaletteModule.init(document, MapModule, config.palette);
  RoutesModule.init(document, {
    storage: StorageModule,
    map: MapModule
  });
});
