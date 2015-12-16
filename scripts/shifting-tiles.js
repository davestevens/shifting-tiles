/**
 * Render a collection of Images
 */

let $ = require("jquery"),
    imageLoader = require("./services/ImageLoader"),
    imageList = require("./services/ImageList"),
    TileBuilder = require("./services/TileBuilder"),
    Animator = require("./services/Animator"),
    DimensionCalculator = require("./services/DimensionCalculator"),
    Directions = require("./services/Directions");

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

    this.directions = new Directions({ $el: this.$el, width: this.width });
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
          tileIndex = Math.floor(Math.random() * this.rows[rowIndex].length);

      this.directions.random(this.rows[rowIndex], tileIndex);
    }

    this.animator.queue();
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
