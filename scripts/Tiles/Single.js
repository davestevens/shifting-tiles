let $ = require("jquery"),
    imageList = require("../services/ImageList");

class Single {
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
      .css({ "background-image": `url('${imageList.get()}')` })
      .appendTo(this.$el);

    return this.$el;
  }
}

module.exports = Single;
