# Shifting Tiles

Displays Images (similar to Shifting Tiles screensaver on Mac OS X).

Example: http://davestevens.github.io/shifting-tiles/
(Images used from http://snippets.khromov.se/stock-photo-archive-zip-77-images/)

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
  animationInterval: 3000,
  columnWidth: 300,
  rowHeight: 300
});

shiftingTiles.render();
```

## API

| Name                 | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `render`             | Builds DOM element, preloads images and builds grid layout                |
| `pause`              | Stops animations.                                                         |
| `resume`             | Resumes animations.                                                       |
| `destroy`            | Removes ShiftingTiles object.                                             |
| `animationInterval=` | Interval between images being switched out (milliseconds), clamped at 1s. |
| `rowCount=`          | Number of rows of images to display.                                      |
| `rowHeight=`         | Requested rows height *.                                                  |
| `columnCount=`       | Number of columns of images to display.                                   |
| `columnWidth=`       | Requested column width *.                                                 |

* This value is used to calculated the closet value while still filling the entire view.

## Options

| Name          | Description                                                       | Default |
| ------------- | ----------------------------------------------------------------- | ------- |
| `el`          | Selector to render Shifting Tiles into.                           | N/A     |
| `imageUrls`   | Array of URLs of Images to display.                               | N/A     |
| `interval`    | Milliseconds between animations.                                  | 3000    |
| `columnCount` | Number of Columns to render (takes precedence over columnWidth).  | N/A     |
| `columnWidth` | Requested width of Columns (used when calculating optimal widths. | 300     |
| `rowCount`    | Number of Rows to render (takes precedence over rowWidth).        | N/A     |
| `rowHeight`   | Requested height of Rows (used when calculating optimal heights.  | 300     |

## TODO

- [x] Pause / Resume Animations
- [x] Define number of rows & columns
- [x] Redraw (Update row/column and redraw current grid)
- [x] Redraw on container resize
- [x] Update animations on change to timeout

## Development

Written in ES6 using babelify for transpilation.

Install dependencies:
```
npm install
```

Build and watch directories (outputs in `example/dist` directory:
```
npm run watch
```

Build directories (outputs in `example/dist` directory:
```
npm run build
```

Create a webserver serving from `example` directory:
```
npm start
```

## Building

Generate minified CSS and JavaScript in `dist` directory:
```
npm run build-prod
```
