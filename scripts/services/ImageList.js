class ImageList {
  constructor() {
    this.images = [];
  }

  add(url) {
    this.images.push(url);
  }

  // TODO: keep track of which are being used
  get() {
    return this.images[
      Math.floor(Math.random() * this.images.length)
    ];
  }
}

module.exports = new ImageList();
