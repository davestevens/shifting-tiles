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
  }

  generate() {
    let calculatedColumnWidth = this._calculateColumnWidth(),
        index = -1,
        width = 0,
        tiles = [],
        pattern = null;

    do {
      pattern = this.patterns[index = ++index % this.patterns.length];

      tiles.push(
        new pattern.klass({
          width: pattern.columns * calculatedColumnWidth,
          height: this.height,
          top: 0,
          left: width
        })
      );

      width += pattern.columns * calculatedColumnWidth;
    } while(width < this.width);

    return tiles;
  }

  /**
   * Ensure we fill the entire Width
   */
  _calculateColumnWidth() {
    return this.width / Math.round(this.width / this.columnWidth);
  }
}

module.exports = TileBuilder;
