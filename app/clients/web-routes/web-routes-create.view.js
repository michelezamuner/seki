export class WebRoutesCreateView {
  constructor (dom) {
    this._dom = dom;
    this._onTrackLoadedListeners = [];

    this._trackInput = null;
  }

  registerOnTrackLoadedListener (listener) {
    this._onTrackLoadedListeners.push(listener);
  }

  render () {
    this._trackInput = this._dom.createElement('input');
    this._trackInput.classList.add('hidden');
    this._trackInput.type = 'file';
    this._trackInput.onchange = () => {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        const track = e.target.result;
        for (const listener of this._onTrackLoadedListeners) {
          listener(track, this._trackInput.routeName);
        }
      });
      reader.readAsText(this._trackInput.files[0]);
    };
    this._dom.appendToBody(this._trackInput);
  }

  onCreateCommand (routeName) {
    this._trackInput.routeName = routeName;
    this._trackInput.click();
  }
}
