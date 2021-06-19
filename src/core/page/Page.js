export class Page {
  constructor(params) {
    this.params =
      params && params.length > 1 ? params[1] : Date.now().toString();
  }

  getRoot() {
    throw new Error('Method "getRoot" is not implemented');
  }

  afterRender() {}

  destroy() {}
}
