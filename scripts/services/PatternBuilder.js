let SingleTile = require("../tiles/Single"),
    DoubleHorizontalTile = require("../tiles/DoubleHorizontal"),
    patterns = [
      { klass: SingleTile, columns: 2 },
      { klass: DoubleHorizontalTile, columns: 1 }
    ];

class PatternBuilder {
  constructor({ width }) {
    this.width = width;

    this.availablePatterns = patterns.sort((a, b) => b.columns - a.columns);
    this.patterns = [];
  }

  generate() {
    this.availablePatterns.forEach((p) => { this.patterns.push(p) });
    this._fillRemainingColumns(this.width.count);

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

  _columnCount() {
    return this.patterns
      .reduce((memo, pattern) => memo + pattern.columns, 0);
  }
}

module.exports = PatternBuilder;
