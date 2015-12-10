let SingleTile = require("../Tiles/Single"),
    DoubleHorizontalTile = require("../Tiles/DoubleHorizontal"),
    patterns = [
      { klass: SingleTile, columns: 2 },
      { klass: DoubleHorizontalTile, columns: 1 }
    ];

class PatternBuilder {
  constructor(options) {
    options = options || {};

    this.availablePatterns = patterns.sort((a, b) => b.columns - a.columns);
    this.width = options.width;
    this.columnWidth = options.columnWidth;

    this.patterns = [];
  }

  get columnWidth() { return this._columnWidth; }
  set columnWidth(value) { this._columnWidth = value; }

  generate() {
    let minimumColumns = this._calculateMinimumColumns(),
        numberOfColumns = Math.floor(this.width / this._calculateColumnWidth()),
        columns = Math.max(minimumColumns, numberOfColumns);

    this.columnWidth = this.width / columns;

    this.availablePatterns.forEach((p) => { this.patterns.push(p) });
    this._fillRemainingColumns(columns);

    return this.patterns;
  }

  _fillRemainingColumns(columns) {
    let patternIndex = 0,
        index = 0;

    while (this._columnCount() < columns) {
      let pattern = this.availablePatterns[patternIndex++],
          count = Math.floor((columns - this._columnCount()) / pattern.columns);

      for (index = 0; index < count; ++index) { this.patterns.push(pattern); }
    }
  }

  _calculateMinimumColumns() {
    return this.availablePatterns
      .reduce((memo, pattern) => memo + pattern.columns, 0);
  }

  _calculateColumnWidth() {
    return this.width / Math.round(this.width / this.columnWidth);
  }

  _columnCount() {
    return this.patterns
      .reduce((memo, pattern) => memo + pattern.columns, 0);
  }
}

module.exports = PatternBuilder;
