export class WebPaletteController {
  constructor (dispatcher) {
    this._dispatcher = dispatcher;
    this._onLoadListeners = [];
  }

  registerOnLoadListener (listener) {
    this._onLoadListeners.push(listener);
  }

  load (map) {
    for (const listener of this._onLoadListeners) {
      listener(map);
    }
  }

  sendCommand (command) {
    this._dispatcher.dispatch('command', command);
  }
}
