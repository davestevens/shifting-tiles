let Base = require("./Base"),
    $ = require("jquery");

class DoubleHorizontal extends Base {
  renderImages() {
    this.images = [
      this._getImage(),
      this._getImage()
    ];

    $("<div/>", { class: "image" })
      .css({
        "background-image": `url('${this.images[0]}')`,
        height: "50%"
      })
      .appendTo(this.$el);

    $("<div/>", { class: "image" })
      .css({
        "background-image": `url('${this.images[1]}')`,
        height: "50%",
        top: "50%"
      })
      .appendTo(this.$el);
  }
}

module.exports = DoubleHorizontal;
