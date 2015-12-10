let PatternBuilder = require("./PatternBuilder");

class TileBuilder {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;
    this.columnWidth = options.columnWidth;
    this.rowHeight = options.rowHeight;

    this.patternBuilder = new PatternBuilder({
      width: this.width,
      columnWidth: this.columnWidth
    });
  }

  generate() {
    let patterns = this.patternBuilder.generate(),
        columnWidth = this.patternBuilder.columnWidth,
        calculatedRowHeight = this._calculateRowHeight(),
        numberOfRows = Math.floor(this.height / calculatedRowHeight),
        tiles = [],
        index;

    for (index = 0; index < numberOfRows; ++index) {
      tiles.push(
        this._generateRow(patterns, columnWidth, calculatedRowHeight, index)
      );
    }

    return tiles;
  }

  _generateRow(patterns, columnWidth, rowHeight, rowIndex) {
    let tiles = [],
        totalWidth = 0,
        width = 0;

    this._shuffle(patterns).forEach((pattern) => {
      width = pattern.columns * columnWidth;
      tiles.push(
        new pattern.klass({
          width: width,
          height: rowHeight,
          top: rowIndex * rowHeight,
          left: totalWidth
        })
      );

      totalWidth += width;
    });

    return tiles;
  }

  _shuffle(array) {
    let counter = array.length, temp, index;

    while (counter > 0) {
      index = Math.floor(Math.random() * counter--);

      temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  _calculateRowHeight() {
    return this.height / Math.round(this.height / this.rowHeight);
  }
}

module.exports = TileBuilder;
