import * as actions from '@/redux/actions';

import {
  getMatrix,
  isCell,
  nextSelector,
  shouldResize,
} from '@/components/table/table.functions';

import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHTML() {
    return createTable(100, this.store.getState());
  }

  prepare() {}

  init() {
    super.init();

    this.selection = new TableSelection();
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$subscribe('formula:input', (text) =>
      this.selection.selected.text(text)
    );

    this.$subscribe('formula:done', () => this.selection.selected.focus());
  }

  selectCell($cell, isCtrlDown = false) {
    this.selection.select($cell, isCtrlDown);
    this.$emit('table:select', $cell);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      const isCtrlDown = event.ctrlKey;
      if (event.shiftKey) {
        const $cells = getMatrix($target, this.selection.selected).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells, isCtrlDown);
      } else {
        this.selectCell($target, isCtrlDown);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.selected.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
