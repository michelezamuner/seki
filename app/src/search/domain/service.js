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
    case '=': return (a, b) => ('' + a) === ('' + b);
    case '>': return (a, b) => a >= b;
    case '<': return (a, b) => a <= b;
    }
  }

  _normalize(string) {
    return string
      .replace(/[\u00C0-\u00C5]/g, 'A')
      .replace(/[\u00C8-\u00CB]/g, 'E')
      .replace(/[\u00CC-\u00CF]/g, 'I')
      .replace(/[\u00D2-\u00D6]/g, 'O')
      .replace(/[\u00D9-\u00DC]/g, 'U')
      .replace(/[\u00E0-\u00E5]/g, 'a')
      .replace(/[\u00E8-\u00EB]/g, 'e')
      .replace(/[\u00EC-\u00EF]/g, 'i')
      .replace(/[\u00F2-\u00F6]/g, 'o')
      .replace(/[\u00F9-\u00FC]/g, 'u')
      .toLowerCase();
  }
}
