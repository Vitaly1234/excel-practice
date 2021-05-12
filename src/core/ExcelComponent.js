import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  storeChanged() {}

  toHTML() {
    return '';
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $subscribe(event, fn) {
    const unsubscriber = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsubscriber);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscriber) => unsubscriber());
  }
}
