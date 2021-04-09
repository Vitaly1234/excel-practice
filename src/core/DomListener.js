export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root in DomListener');
    }
    this.$root = $root;
  }
}
