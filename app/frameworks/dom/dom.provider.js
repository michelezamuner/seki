/* global window */
import { Dom } from './dom.js';

export const DomProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }
    const dispatcher = container.get('dispatcher');
    window.addEventListener('DOMContentLoaded', () => {
      dispatcher.dispatch('ui.dom', Dom);
    });
    this._provided = true;
  }
};
