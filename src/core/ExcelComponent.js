import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }

  prepare() {}

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

  $subscribeStore(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubscriber) => unsubscriber());
    this.storeSub.unsubscribe();
  }
}
