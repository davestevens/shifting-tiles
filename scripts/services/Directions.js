class Directions {
  constructor({ $el, width }) {
    this.$el = $el;
    this.width = width;
  }

  random(tiles, index) {
    (Math.random() < 0.5 ? this.left : this.right).call(this, tiles, index);
  }

  left(tiles, index) {
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

  right(tiles, index) {
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
}

module.exports = Directions;
