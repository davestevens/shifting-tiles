class ImageList {
  constructor() {
    this.images = [];
    this.available = [];
  }

  add(url) {
    this.images.push(url);
    this.available.push(url);
  }

  get() {
    let url = this.available[
      Math.floor(Math.random() * this.available.length)
    ];

    if (!url) {
      return this.images[Math.floor(Math.random() * this.images.length)];
    }

    if (this.available.indexOf(url) > -1) {
      this.available.splice(this.available.indexOf(url), 1);
    }

    return url;
  }

  restore(url) {
    this.available.push(url);
  }

  clear() {
    this.images = [];
    this.available = [];
  }
}

module.exports = new ImageList();
