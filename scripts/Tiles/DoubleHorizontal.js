let $ = require("jquery"),
    imageList = require("../services/ImageList");

class DoubleHorizontal {
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

    $("<div/>", { class: "image" })
      .css({
        "background-image": `url('${imageList.get()}')`,
        height: "50%"
      })
      .appendTo(this.$el);

    $("<div/>", { class: "image" })
      .css({
        "background-image": `url('${imageList.get()}')`,
        height: "50%",
        top: "50%"
      })
      .appendTo(this.$el);

    return this.$el;
  }
}

module.exports = DoubleHorizontal;
