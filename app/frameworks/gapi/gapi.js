export class Gapi {
  constructor (gapi, spreadsheetId) {
    this._gapi = gapi;
    this._spreadsheetId = spreadsheetId;
    this._idsToRows = {};
    this._emptyRows = {};
    this._highestIds = {};
  }

  nextId (table) {
    return this._highestIds[table] ? this._highestIds[table] + 1 : 1;
  }

  load (table, callback) {
    this._gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this._spreadsheetId,
      range: table
    }).then(response => {
      const data = [];
      const head = response.result.values[0];
      for (const i in response.result.values) {
        if (i === '0') {
          continue;
        }
        const row = response.result.values[i];
        if (row.length === 0) {
          continue;
        }
        const values = {};
        for (const column in head) {
          const value = row[column];
          values[head[column]] = head[column] === 'id' ? parseInt(value) : value;
        }
        data.push(values);
        this._updateIdsToRows(table, values, parseInt(i) + 1);
        this._updateHighestIds(table, values);
      }
      callback(data);
    });
  }

  save (table, values, callback) {
    const row = this._getRow(table, values);
    callback();
    // this._gapi.client.sheets.spreadsheets.values.update({
    //   spreadsheetId: this._spreadsheetId,
    //   range: `${table}!A${row}:Z`,
    //   valueInputOption: 'RAW'
    // }, {
    //   values: values
    // }).then(response => {
    //   this._updateIdsToRows(table, values, row);
    //   this._updateHighestIds(table, values);
    //   callback();
    // }, e => { console.log(e); });
  }

  _getRow (table, values) {
    const row = this._getRowFromId(table, values.id);
    if (row) {
      return row;
    }

    const emptyRow = this._getFirstEmptyRow(table);
    if (emptyRow) {
      return emptyRow;
    }

    return Object.keys(this._idsToRows[table]).length + 2;
  }

  _getRowFromId (table, id) {
    if (!this._idsToRows[table]) {
      this._idsToRows[table] = {};

      return;
    }

    return this._idsToRows[table][id];
  }

  _getFirstEmptyRow (table) {
    if (!this._emptyRows[table]) {
      this._emptyRows[table] = [];
    }

    return this._emptyRows[table].length ? this._emptyRows[table][0] : undefined;
  }

  _updateIdsToRows (table, values, row) {
    if (!this._idsToRows[table][values.id]) {
      this._idsToRows[table][values.id] = row;
    }
  }

  _updateHighestIds (table, values) {
    if (!this._highestIds[table]) {
      this._highestIds[table] = values.id;

      return;
    }

    if (values.id > this._highestIds[table]) {
      this._highestIds[table] = values.id;
    }
  }
}
