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

    // TODO: calculate Tile dimensions (based on this.$el)
    this.tiles = tileBuilder.generate();

    // TODO: render a set of Tiles
    this.$el.html(
      this.tiles.map(function(tile) {
        return tile.render();
      })
    );

    // TODO: start a loop for animating tiles
    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
    // TODO: select random tile
    // TODO: anmiate out, replace with another of same type
  }

  _animate() {
    window.clearTimeout(this.timeout);

    // Choose a random Tile
    if (this.tiles.length > 0) {
      let tileIndex = Math.floor(Math.random() * this.tiles.length),
          direction = this._chooseDirection(),
          tile = this.tiles[tileIndex],
          clone = null;
      console.log(tileIndex, direction);

      switch(direction) {
      case "left":
        clone = tile.clone();
        clone.left = this.width;
        this.$el.append(clone.render());
        this.tiles.splice(tileIndex, 1);

        this.tiles.push(clone);

        // Update width to 0
        tile.removeLeft();

        // Update all to the right (+) to have move left -= Tile.width
        this.tiles.slice(tileIndex).forEach((t) => {
          t.updateView({ left: `-=${tile.width}` })
        });
        break;
      case "right":
        // splice tileIndex out of this.tiles
        // Update width to 0
        // Update all to the left (-) to have move right += Tile.width
        // Add a new Tile (same type as just removed) with left = -width
        // Animate in with left = 0
        clone = tile.clone();
        clone.left = -clone.width;
        this.$el.append(clone.render());
        this.tiles.splice(tileIndex, 1);

        this.tiles.unshift(clone);

        // Update width to 0
        tile.removeRight();

        // Update all to the left (-) to have move right += Tile.width
        this.tiles.slice(0, tileIndex + 1).forEach((t) => {
          t.updateView({ left: `+=${tile.width}` })
        });
        break;
      }
    }

    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
  }

  _chooseDirection() {
    return Math.random() < 0.5 ? "left": "right";
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
