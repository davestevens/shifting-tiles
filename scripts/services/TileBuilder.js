let SingleTile = require("../Tiles/Single"),
    DoubleHorizontalTile = require("../Tiles/DoubleHorizontal");

class TileBuilder {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;

    this.patterns = [
      { klass: SingleTile, columns: 2 },
      { klass: DoubleHorizontalTile, columns: 1 }
    ];
    this.columnWidth = 230;
    this.rowHeight = 250;
  }

  generate() {
    let calculatedColumnWidth = this._calculateColumnWidth(),
        calculatedRowHeight = this._calculateRowHeight(),
        numberOfRows = Math.floor(this.height / calculatedRowHeight),
        tiles = [],
        index;

    for (index = 0; index < numberOfRows; ++index) {
      tiles.push(
        this._generateRow(calculatedColumnWidth, calculatedRowHeight, index)
      );
    }

    return tiles;
  }

  _generateRow(columnWidth, rowHeight, rowIndex) {
    let index = -1,
        totalWidth = 0,
        tiles = [],
        pattern = null;

    do {
      pattern = this.patterns[index = ++index % this.patterns.length];

      tiles.push(
        new pattern.klass({
          width: pattern.columns * columnWidth,
          height: rowHeight,
          top: rowIndex * rowHeight,
          left: totalWidth
        })
      );

      totalWidth += pattern.columns * columnWidth;
    } while(totalWidth < this.width);

    return tiles;
  }

  /**
   * Ensure we fill the entire Area
   */
  _calculateColumnWidth() {
    return this.width / Math.round(this.width / this.columnWidth);
  }

  _calculateRowHeight() {
    return this.height / Math.round(this.height / this.rowHeight);
  }
}

module.exports = TileBuilder;
