let $ = require("jquery"),
    imageList = require("../services/ImageList");

class Base {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;

    this.images = [];
  }

  render() {
    this.$el = $("<div/>", { class: "tile" })
      .css({
        height: this.height,
        width: this.width,
        top: this.top,
        left: this.left
      });

    this.renderImages();

    return this.$el;
  }

  renderImages() {
    throw new Error("Not Implemented: Include code to render image(s) here.");
  }

  updateView(options) {
    this.$el.css(options || {});
  }

  remove() {
    const self = this;

    self.$el.css({ "z-index": 1 });
    this.images.forEach((url) => imageList.restore(url));
    setTimeout(() => { self.$el.remove(); }, 1000);
  }

  clone(options) {
    return new this.constructor($.extend({
      width: this.width,
      height: this.height,
      left: this.left,
      top: this.top
    }, options));
  }

  _getImage() {
    return imageList.get();
  }
}

module.exports = Base;
