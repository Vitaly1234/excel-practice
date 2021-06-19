import {$} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is required');
    }

    this.$placeholder = $(selector);
    this.routes = routes;

    this.loader = new Loader();

    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }

    this.$placeholder.clear().append(this.loader);

    const params = ActiveRoute.param;
    const route = params[0];
    const Page = this.routes[route] || this.routes['dashboard'];

    this.page = new Page(params);

    const root = await this.page.getRoot();

    this.$placeholder.clear().append(root);

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
