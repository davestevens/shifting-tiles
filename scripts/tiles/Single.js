let Base = require("./Base"),
    $ = require("jquery");

class Single extends Base {
  renderImages() {
    this.images = [
      this._getImage()
    ];

    $("<div/>", { class: "image" })
      .css({ "background-image": `url('${this.images[0]}')` })
      .appendTo(this.$el);
  }
}

module.exports = Single;
