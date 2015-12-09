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
    this.width = this.$el.width(),
    this.height = this.$el.height(),
    this.imageUrls = options.imageUrls || [];
    this.interval = options.interval || 3000;
    this.timeout = null;
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
      width: this.width,
      height: this.height
    });

    // Calculate Tile dimensions (based on this.$el)
    this.tiles = tileBuilder.generate();

    // Render a set of Tiles
    this.$el.html(
      this.tiles.map(function(tile) {
        return tile.render();
      })
    );

    // Start a loop for animating tiles
    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
  }

  _animate() {
    window.clearTimeout(this.timeout);

    // Choose a random Tile
    if (this.tiles.length > 0) {
      let tileIndex = Math.floor(Math.random() * this.tiles.length),
          direction = this._chooseDirection();

      direction.call(this, tileIndex);
    }

    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
  }

  _chooseDirection() {
    return Math.random() < 0.5 ? this._removeLeft: this._removeRight;
  }

  _removeLeft(index) {
    let tile = this.tiles[index],
        clone = tile.clone({ left: this.width });

    this.$el.append(clone.render());
    this.tiles.splice(index, 1);

    this.tiles.push(clone);

    tile.removeLeft();

    // Update all to the right (+) to have move left -= Tile.width
    this.tiles.slice(index).forEach((t) => {
      t.updateView({ left: `-=${tile.width}` })
    });
  }

  _removeRight(index) {
    let tile = this.tiles[index],
        clone = tile.clone({ left: -tile.width });

    this.$el.append(clone.render());
    this.tiles.splice(index, 1);

    this.tiles.unshift(clone);

    tile.removeRight();

    // Update all to the left (-) to have move right += Tile.width
    this.tiles.slice(0, index + 1).forEach((t) => {
      t.updateView({ left: `+=${tile.width}` })
    });
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
