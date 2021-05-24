/* global document, gapi */
import { Gapi } from './gapi.js';

export const GapiProvider = {
  _provided: false,
  provide: function (container) {
    if (this._provided) {
      return;
    }

    const dispatcher = container.get('dispatcher');

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.setAttribute('onload', "this.onload=function(){};document.dispatchEvent(new Event('gapi.script'));");
    script.setAttribute('onreadystatechange', "if(this.readyState==='complete')this.onload()");
    document.addEventListener('gapi.script', () => {
      gapi.load('client:auth2', () => {
        const config = container.get('config.gapi');
        gapi.client.init({
          apiKey: config.apiKey,
          clientId: config.clientId,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
          const adapter = new Gapi(gapi, config.spreadsheetId);
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          if (!isSignedIn) {
            gapi.auth2.getAuthInstance().signIn().then(response => {
              dispatcher.dispatch('gapi', adapter);
            });
          } else {
            dispatcher.dispatch('gapi', adapter);
          }
        });
      });
    });
    document.body.appendChild(script);

    this._provided = true;
  }
};
