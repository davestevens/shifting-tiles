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

  updateView(options) {
    this.$el.css(options || {});
  }

  removeLeft() {
    this._remove({ width: 0 });
  }

  removeRight() {
    this._remove({ width: 0, left: `+=${this.width}` });
  }

  clone() {
    return new DoubleHorizontal({
      width: this.width,
      height: this.height,
      left: this.left,
      top: this.top
    });
  }

  _remove(options) {
    const self = this;

    self.$el.css(options || {});
    setTimeout(() => { self.$el.remove(); }, 1000);
  }
}

module.exports = DoubleHorizontal;
