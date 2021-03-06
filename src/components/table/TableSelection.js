export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.selected = null;
  }

  select($el, isUnion) {
    if (!isUnion) {
      this.clear();
    }

    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.selected = $el;
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className));
    this.group = [];
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  selectGroup($group = [], isUnion) {
    if (!isUnion) {
      this.clear();
      this.group = $group;
    } else {
      this.group = [...this.group, ...$group];
    }
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
