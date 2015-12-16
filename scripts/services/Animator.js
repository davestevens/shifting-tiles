class Animator {
  constructor({ animate, interval = 3000 }) {
    this.animate = animate;
    this.interval = interval;

    this.timer = null;
  }

  get interval() { return this._interval; }
  set interval(value) {
    this._interval = Math.max(value, 1000);
    this.queue();
  }

  queue() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(
      this.animate,
      this.interval
    );
  }
}

module.exports = Animator;
