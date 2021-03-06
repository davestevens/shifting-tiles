/**
 * Calculate the Row/Column dimensions
 * Count takes precedence over pixel dimensions
 */

class DimensionCalculator {
  constructor({ count, pixels, total, onChange }) {
    this._count = count;
    this._pixels = pixels || 300;
    this._total = total;

    this.onChange = onChange || (() => { /* No-op */ });

    this.size = this._calculate();
  }

  get count() {
    return this._count || Math.round(this.total / this.pixels);
  }
  set count(value) {
    this._count = value;
    this.size = this._calculate();
    this.onChange();
  }

  get pixels() { return this._pixels; }
  set pixels(value) {
    this._pixels = value;
    this._count = null;
    this.size = this._calculate();
    this.onChange();
  }

  get total() { return this._total; }
  set total(value) {
    this._total = value;
    this.size = this._calculate();
    this.onChange();
  }

  _calculate() {
    return this.total / this.count;
  }
}

module.exports = DimensionCalculator;
