import {debounce, storage} from '@core/utils';

import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Page} from '@core/Page';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {createStore} from '@core/store/createStore';
import {normalizeInitialState} from '@/redux/initialState';
import {rootReducer} from '@/redux/rootReducer';

function storageName(param) {
  return `excel:${param}`;
}
export class ExcelPage extends Page {
  getRoot() {
    const params =
      this.params && this.params.length > 1 ?
        this.params[1] :
        Date.now().toString();

    const state = storage(storageName(params));
    const store = createStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}