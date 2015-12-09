let Tile = require("./Tile"),
    TileDoubleHorizontal = require("./TileDoubleHorizontal");

class TileBuilder {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;

    this.patterns = [
      { klass: Tile, columns: 2 },
      { klass: TileDoubleHorizontal, columns: 1 }
    ];
    this.columnWidth = 230;
  }

  // TODO: return a set of Tiles based on Dimensions...
  generate() {
    let calculatedColumnWidth = this._calculateColumnWidth();
    console.log(calculatedColumnWidth);

    let index = -1,
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
    let columnCount = 0,
        index = -1,
        width = 0,
        pattern = null;

    do {
      pattern = this.patterns[index = ++index % this.patterns.length];
      width += pattern.columns * this.columnWidth;
      if (width < this.width) { columnCount += pattern.columns; }
    } while (width < this.width);

    return (this.width / columnCount);
  }
}

module.exports = TileBuilder;
