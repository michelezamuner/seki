export const Container = {
  _dependencies: {},
  bind: function (name, dependency) {
    this._dependencies[name] = dependency;
  },
  get: function (name, ...args) {
    const resolver = this._dependencies[name];
    if (resolver.constructor && resolver.constructor.name === 'Function') {
      if (resolver.prototype) {
        // eslint-disable-next-line new-cap
        return new resolver(...args);
      }
      return resolver(...args);
    }
    return resolver;
  }
};
