/* global L */
export const PaletteModule = {
  init: function (dom, mapModule, config) {
    const palette = dom.createElement('div');
    palette.classList.add('hidden');
    palette.hiding = false;
    const PaletteControl = L.Control.extend({
      onAdd: () => palette,
      onRemove: () => {}
    });
    new PaletteControl({ position: config.position }).addTo(mapModule.map);

    const commandInput = dom.createElement('input');
    commandInput.placeholder = 'Type command...';
    commandInput.style.width = '300px';
    commandInput.onkeydown = e => {
      e = e || window.event;
      if (e.key === 'Enter') {
        palette.classList.add('hidden');
        palette.hiding = true;
        if (commandInput.value.trim() !== '') {
          dom.dispatchEvent(new CustomEvent('command', { detail: commandInput.value }));
        }
      }
    };
    palette.appendChild(commandInput);

    dom.onkeydown = e => {
      e = e || window.event;
      if (e.key !== 'Enter' || !palette.classList.contains('hidden')) {
        return;
      }

      if (palette.hiding) {
        palette.hiding = false;
      } else {
        palette.classList.remove('hidden');
        commandInput.focus();
      }
    };
  }
};
