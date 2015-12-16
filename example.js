var shiftingTiles = new ShiftingTiles({
  el: ".shifting-tiles-example-1",
  imageUrls: [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
    "images/7.jpg",
    "images/8.jpg"
  ],
  interval: 3000,
  columnCount: 4,
  rowCount: 2
});

shiftingTiles.render();
