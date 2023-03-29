export default class Service {
  constructor(config) {
    this._config = config;
  }

  criteria(query) {
    const criteria = [];
    const parts = query.split(',').map(p => p.trim());
    for (const part of parts) {
      const matches = part.match(/^([\w]+)\s+([^\s]+)\s+(.*)$/);
      criteria.push({
        field: matches ? matches[1] : this._config.defaultField,
        compare: this._compare(matches ? matches[2] : '~'),
        value: matches ? matches[3] : part,
      });
    }

    return criteria;
  }

  _compare(symbol) {
    switch (symbol) {
    case '~': return (a, b) => this._normalize(a).includes(this._normalize(b));
    case '=': return (a, b) => a === b;
    case '>': return (a, b) => a >= b;
    case '<': return (a, b) => a <= b;
    }
  }

  _normalize(string) {
    return string
      .replace('à', 'a')
      .replace('è', 'e')
      .replace('é', 'e')
      .replace('ì', 'i')
      .replace('ò', 'o')
      .replace('ù', 'u')
      .toLowerCase();
  }
}
