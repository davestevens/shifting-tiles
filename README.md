# Shifting Tiles

Displays Images (similar to Shifting Tiles screensaver on Mac OS X).

## Usage

```javascript
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
  columnWidth: 300,
  rowHeight: 300
});

shiftingTiles.render();
```

## Options

| Name          | Description                                                       | Default |
| ------------- | ----------------------------------------------------------------- | ------- |
| `el`          | Selector to render Shifting Tiles into.                           | N/A     |
| `imageUrls`   | Array of URLs of Images to display.                               | N/A     |
| `interval`    | Milliseconds between animations.                                  | 3000    |
| `columnWidth` | Requested width of Columns (used when calculating optimal widths. | 300     |
| `rowHeight`   | Requested height of Rows (used when calculating optimal heights.  | 300     |

## TODO

- [ ] Pause / Resume Animations

## Development

Written in ES6 using babelify for transpilation.

Install dependencies:
```
npm install
```

Build and watch directories:
```
npm run build-dev
```
