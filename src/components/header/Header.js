import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {debounce} from '@core/utils';
import {defaultTitle} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
          <input type="text" class="input" value="${title}" />
          <div>
            <div class="button" data-button="remove">
              <span class="material-icons" data-button="remove">delete</span>
            </div>
            <div class="button" data-button="exit">
              <span class="material-icons" data-button="exit">exit_to_app</span>
            </div>
          </div>
    `;
  }

  onCLick(event) {
    const $target = $(event.target);

    if ($target.data.button === 'remove') {
      const isRemove = confirm('Вы действительно хотите удалить эту таблицу?');
      if (isRemove) {
        localStorage.removeItem(`excel:${ActiveRoute.param[1]}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
