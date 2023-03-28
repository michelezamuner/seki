export default class WebEventFactory {
  fromNativeEvent(nativeEvent) {
    let event = {};
    if (nativeEvent.detail && typeof nativeEvent.detail === 'object') {
      event = { ...nativeEvent.detail };
    }
    for (const field in nativeEvent) {
      if (field !== 'detail') {
        event[field] = nativeEvent[field];
      }
    }

    return event;
  }

  toNativeEvent(eventName, event) {
    return new CustomEvent(eventName, { detail: event });
  }
}
