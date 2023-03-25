import Presenter from './presenter.js';
import Controller from './controller.js';

export default class Provider {
  provide(dispatcher) {
    const presenter = new Presenter(dispatcher);
    const controller = new Controller(presenter);

    controller.register(dispatcher);
  }
}
