/**
 * Render a collection of Images
 */

let $ = require("jquery"),
    imageLoader = require("./services/ImageLoader"),
    imageList = require("./services/ImageList"),
    TileBuilder = require("./services/TileBuilder"),
    Animator = require("./services/Animator"),
    DimensionCalculator = require("./services/DimensionCalculator");

class ShiftingTiles {
  constructor(options) {
    options = options || {};

    this.$el = $(options.el);
    this.imageUrls = options.imageUrls || [];

    this.width = new DimensionCalculator({
      count: options.columnCount,
      pixels: options.columnWidth,
      total: this.$el.width()
    });
    this.height = new DimensionCalculator({
      count: options.rowCount,
      pixels: options.rowHeight,
      total: this.$el.height()
    });

    this.paused = false;
    this.animator = new Animator({
      animate: this._animate.bind(this),
      interval: options.animationInterval
    });
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
    window.clearTimeout(this.animationTimer);
  }

  resume() {
    this.paused = false;
    this.animator.queue();
  }

  destroy() {
    this.pause();
    this.$el.remove();
    this.imageUrls = [];
    imageList.clear();
  }

  get animationInterval() { return this.animator.interval; }
  set animationInterval(value) { this.animator.interval = value; }

  get rowCount() { return this.height.count; }
  set rowCount(value) {
    this.height.count = value;
    this._build();
  }

  get rowHeight() { return this.height.pixels; }
  set rowHeight(value) {
    this.height.pixels = value;
    this._build();
 }

  get columnCount() { return this.width.count; }
  set columnCount(value) {
    this.width.count = value;
    this._build();
  }

  get columnWidth() { return this.width.pixels; }
  set columnWidth(value) {
    this.width.pixels = value;
    this._build();
  }

  _build() {
    let tileBuilder = new TileBuilder({
      width: this.width,
      height: this.height
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
  }

  _animate() {
    if (this.paused) { return; }

    // Choose a random Tile
    if (this.rows.length > 0) {
      let rowIndex = Math.floor(Math.random() * this.rows.length),
          tileIndex = Math.floor(Math.random() * this.rows[rowIndex].length),
          direction = this._chooseDirection();

      direction.call(this, this.rows[rowIndex], tileIndex);
    }

    this.animator.queue();
  }

  _chooseDirection() {
    return Math.random() < 0.5 ? this._removeLeft: this._removeRight;
  }

  _removeLeft(tiles, index) {
    let tile = tiles[index],
        clone = tile.clone({ left: this.width.total });

    this.$el.append(clone.render());
    tiles.push(clone);

    tile.remove();

    // Update all to the right (+) to have move left -= Tile.width
    tiles.slice(index).forEach((t) => {
      t.updateView({ left: `-=${tile.width}` })
    });
    tiles.splice(index, 1);
  }

  _removeRight(tiles, index) {
    let tile = tiles[index],
        clone = tile.clone({ left: -tile.width });

    this.$el.append(clone.render());
    tiles.unshift(clone);

    tile.remove();

    // Update all to the left (-) to have move right += Tile.width
    tiles.slice(0, index + 2).forEach((t) => {
      t.updateView({ left: `+=${tile.width}` })
    });
    tiles.splice(index + 1, 1);
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
