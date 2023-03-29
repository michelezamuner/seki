export default class PeakBox {
  constructor(peak) {
    this._peak = peak;
  }

  render() {
    return `
    <h3>${this._peak.name}</h3>
    <b>Altezza: </b>${this._peak.elevation} m<br>
    <b>Sottosezione: </b>${this._peak.subSection}<br>
    <b>Supergruppo: </b>${this._peak.superGroup}<br>
    <b>Gruppo: </b>${this._peak.group}<br>
    <b>Sottogruppo: </b>${this._peak.subGroup}<br>
    `;
  }
}
