let $ = require("jquery");

class TileDoubleHorizontal {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;
  }

  render() {
    this.$el = $("<div/>", { class: "tile" })
      .css({
        height: this.height,
        width: this.width,
        top: this.top,
        left: this.left
      });

    // TODO: append 2 Image elements

    return this.$el;
  }
}

module.exports = TileDoubleHorizontal;
