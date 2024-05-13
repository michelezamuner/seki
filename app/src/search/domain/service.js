export default class Service {
  constructor(config) {
    this._config = config;
  }

  criteria(query) {
    const criteria = [];
    const parts = query.split('&&').map(p => p.trim());
    for (const part of parts) {
      const matches = part.match(/^([^~=><]+)([~=><])?([^~=><]+)?$/);
      const isOnlyCompareString = matches[2] === undefined;
      criteria.push({
        field: isOnlyCompareString ? this._config.defaultField : matches[1].trim(),
        compare: this._compare(isOnlyCompareString ? '~' : matches[2]),
        value: isOnlyCompareString ? part : matches[3].trim(),
      });
    }

    return criteria;
  }

  _compare(symbol) {
    switch (symbol) {
    case '~': return (a, b) => {
      const string = this._normalize(a);
      const keywords = this._normalize(b).split(/\s+/);
      for (const keyword of keywords) {
        if (!string.includes(keyword)) {
          return false;
        }
      }

      return true;
    };
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
