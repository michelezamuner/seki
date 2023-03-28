export default class Service {
  criteria(query) {
    // [field] [operator] [value]
    // name ~ col nudo, alt > 1000, dist < 10
    const criteria = [];
    const parts = query.split(',').map(p => p.trim());
    for (const part of parts) {
      const matches = part.match(/^([\w]+)\s+([^\s]+)\s+(.*)$/);
      criteria.push({
        field: matches[1],
        compare: this._compare(matches[2]),
        value: matches[3],
      });
    }

    return criteria;
  }

  _compare(symbol) {
    switch (symbol) {
    case '~': return (a, b) => {
      return this._normalize(a).includes(this._normalize(b));
    };
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
