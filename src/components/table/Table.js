import {
  getMatrix,
  isCell,
  shouldResize,
} from '@/components/table/table.functions';

import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@/components/table/TableSelection';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return createTable(100);
  }

  prepare() {}

  init() {
    super.init();

    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      const isCtrlDown = event.ctrlKey;
      if (event.shiftKey) {
        const $cells = getMatrix($target, this.selection.selected).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells, isCtrlDown);
      } else {
        this.selection.select($target, isCtrlDown);
      }
    }
  }
}
