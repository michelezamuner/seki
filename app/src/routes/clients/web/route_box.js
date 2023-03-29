export default class RouteBox {
  constructor(route) {
    this._route = route;
  }

  render() {
    return `
    <h3>${this._route.name}</h3>
    <b>Dislivello: </b>${this._route.elevation} m<br>
    <b>Distanza: </b>${this._route.distance} km<br>
    <b>Tempo: </b>${this._route.time}<br>
    <b>Difficoltà: </b>${this._route.difficulty}<br>
    <b>Note: </b>${this._route.notes}<br>
    <b>Riferimenti:</b><br><ul>${this._renderList(this._route.references)}</ul>
    `;
  }

  _renderList(list) {
    return list
      .map(item => `<li>${item}</li>`)
      .join('');
  }
}
