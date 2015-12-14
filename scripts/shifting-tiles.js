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
    this.columnCount = options.columnCount;
    this.columnWidth = options.columnWidth || 300;
    this.rowCount = options.rowCount;
    this.rowHeight = options.rowHeight || 300;
    this.paused = false;
    this.timeout = null;
  }

  render() {
    this.$el
      .addClass("shifting-tiles")
      .html(this._loadingView());
    $.when.apply($, this._preloadImages())
      .always(this._build.bind(this));
  }

  pause() {
    this.paused = true;
    window.clearTimeout(this.timeout);
  }

  resume() {
    this.paused = false;
    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
  }

  destroy() {
    this.pause();
    this.$el.remove();
    this.imageUrls = [];
    imageList.clear();
  }

  _build() {
    let tileBuilder = new TileBuilder({
      width: this.width,
      height: this.height,
      columnCount: this.columnCount,
      columnWidth: this.columnWidth,
      rowCount: this.rowCount,
      rowHeight: this.rowHeight
    });

    // Calculate Tile dimensions (based on this.$el)
    this.rows = tileBuilder.generate();

    // Render a set of Tiles
    let tileElements = [];
    this.rows.forEach(function(row) {
      row.forEach(function(tile) {
        tileElements.push(tile.render());
      });
    });
    this.$el.html(tileElements);

    if (!this.paused) {
      // Start a loop for animating tiles
      this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
    }
  }

  _animate() {
    window.clearTimeout(this.timeout);

    // Choose a random Tile
    if (this.rows.length > 0) {
      let rowIndex = Math.floor(Math.random() * this.rows.length),
          tileIndex = Math.floor(Math.random() * this.rows[rowIndex].length),
          direction = this._chooseDirection();

      direction.call(this, this.rows[rowIndex], tileIndex);
    }

    this.timeout = window.setTimeout(this._animate.bind(this), this.interval);
  }

  _chooseDirection() {
    return Math.random() < 0.5 ? this._removeLeft: this._removeRight;
  }

  _removeLeft(tiles, index) {
    let tile = tiles[index],
        clone = tile.clone({ left: this.width });

    this.$el.append(clone.render());
    tiles.splice(index, 1);

    tiles.push(clone);

    tile.removeLeft();

    // Update all to the right (+) to have move left -= Tile.width
    tiles.slice(index).forEach((t) => {
      t.updateView({ left: `-=${tile.width}` })
    });
  }

  _removeRight(tiles, index) {
    let tile = tiles[index],
        clone = tile.clone({ left: -tile.width });

    this.$el.append(clone.render());
    tiles.splice(index, 1);

    tiles.unshift(clone);

    tile.removeRight();

    // Update all to the left (-) to have move right += Tile.width
    tiles.slice(0, index + 1).forEach((t) => {
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

  _loadingView() {
    return $("<div/>", { class: "loading" })
      .append($("<div/>" , { class: "spinner" }));
  }
}

module.exports = ShiftingTiles;
