export class WebRoutesCreateView {
  constructor (dispatcher, dom) {
    this._dispatcher = dispatcher;
    this._dom = dom;
    this._trackInput = this._dom.createElement('input');
  }

  render () {
    this._trackInput.classList.add('hidden');
    this._trackInput.type = 'file';
    this._trackInput.onchange = () => {
      const reader = new FileReader();
      reader.addEventListener('load', e => {
        const track = e.target.result;
        this._dispatcher.dispatch('ui.web-routes.loaded', {
          track: track,
          routeName: this._trackInput.routeName
        });
      });
      if (!this._trackInput.routeName) {
        this._trackInput.routeName = this._trackInput.files[0].name.replace(/\.[^/.]+$/, '');
      }
      reader.readAsText(this._trackInput.files[0]);
    };
    this._dom.appendToBody(this._trackInput);
  }

  onCreateRoute (name) {
    this._trackInput.routeName = name;
    this._trackInput.click();
  }
}
