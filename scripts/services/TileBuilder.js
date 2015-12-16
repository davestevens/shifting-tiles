let PatternBuilder = require("./PatternBuilder");

class TileBuilder {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;

    this.patternBuilder = new PatternBuilder({
      width: this.width
    });
  }

  generate() {
    let patterns = this.patternBuilder.generate(),
        tiles = [],
        index;

    for (index = 0; index < this.height.count; ++index) {
      tiles.push(this._generateRow(patterns, index));
    }

    return tiles;
  }

  _generateRow(patterns, rowIndex) {
    const self = this;
    let tiles = [],
        totalWidth = 0,
        width = 0;

    this._shuffle(patterns).forEach((pattern) => {
      width = pattern.columns * self.width.size;
      tiles.push(
        new pattern.klass({
          width: width,
          height: self.height.size,
          top: rowIndex * self.height.size,
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
}

module.exports = TileBuilder;
