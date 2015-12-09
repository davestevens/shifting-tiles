/**
 * Render a collection of Images
 */

let $ = require("jquery"),
    imageLoader = require("./services/ImageLoader"),
    imageList = require("./services/ImageList"),
    TileBuilder = require("./services/TileBuilder");

class ShiftingTiles {
  constructor(options) {
    options = options || {};

    this.$el = $(options.el);
    this.imageUrls = options.imageUrls || [];
  }

  render() {
    this.$el
      .addClass("shifting-tiles")
      .html("Loading"); // TODO: Loading view
    $.when.apply($, this._preloadImages())
      .always(this._build.bind(this));
  }

  _build() {
    let tileBuilder = new TileBuilder({
      width: this.$el.width(),
      height: this.$el.height()
    });

    // TODO: calculate Tile dimensions (based on this.$el)
    this.tiles = tileBuilder.generate();

    // TODO: render a set of Tiles
    this.$el.html(
      this.tiles.map(function(tile) {
        return tile.render();
      })
    );
    // TODO: give an image to each Tile

    // TODO: start a loop for animating tiles
    // TODO: select random tile
    // TODO: anmiate out, replace with another of same type
  }

  _preloadImages() {
    return this.imageUrls.map(function(imageUrl) {
      return imageLoader(imageUrl)
        .then(function() {
          imageList.add(imageUrl);
        });
    });
  }
}

module.exports = ShiftingTiles;
