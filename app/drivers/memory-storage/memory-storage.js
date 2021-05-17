export class MemoryStorage {
  findRouteByName (name) {
    if (name === 'missing') {
      return null;
    }

    return 'something';
  }
}
