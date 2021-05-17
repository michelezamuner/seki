export class WebPaletteView {
  constructor (dom, leaflet, config) {
    this._dom = dom;
    this._leaflet = leaflet;
    this._config = config;
    this._onCommandListeners = [];
  }

  registerOnCommandListener (listener) {
    this._onCommandListeners.push(listener);
  }

  render (webPaletteLoadViewModel) {
    const map = webPaletteLoadViewModel.map;

    const paletteElement = this._dom.createElement('div');
    paletteElement.classList.add('hidden');
    paletteElement.hiding = false;

    const PaletteControl = this._leaflet.control({
      onAdd: () => paletteElement,
      onRemove: () => {}
    });
    new PaletteControl({ position: this._config.position }).addTo(map);

    const commandInput = this._dom.createElement('input');
    commandInput.placeholder = 'Type command...';
    commandInput.style.width = '300px';
    commandInput.onkeydown = this._dom.keyCallback('Enter')(() => {
      paletteElement.classList.add('hidden');
      paletteElement.hiding = true;
      const command = commandInput.value.trim();
      if (command !== '') {
        for (const listener of this._onCommandListeners) {
          listener(command);
        }
      }
    });
    paletteElement.appendChild(commandInput);

    this._dom.onKeyDown(this._dom.keyCallback('Enter')(() => {
      if (!paletteElement.classList.contains('hidden')) {
        return;
      }

      if (paletteElement.hiding) {
        paletteElement.hiding = false;
      } else {
        paletteElement.classList.remove('hidden');
        commandInput.focus();
      }
    }));
  }
}
