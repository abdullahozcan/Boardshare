var fabric = require('../../../lib/fabric/dist/fabric').fabric;

exports.createLine = function(loc, options) {
  return new fabric.Line([loc.x, loc.y, loc.x, loc.y], {
    strokeWidth: options.lineWidth,
    fill: options.fillColor,
    stroke: options.strokeColor,
    originX: 'left',
    originY: 'top'
  });
};
exports.updateLine = function(line, loc) {
  line.set({x2: loc.x, y2: loc.y});
};

exports.createRect = function(loc, options) {
  return new fabric.Rect({
    top: loc.y,
    left: loc.x,
    width: 1,
    height: 1,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.lineWidth,
    angle: 0,
    transparentCorners: false
  });
};
exports.updateRect = function(rect, loc) {
  if (canvas.origX > loc.x) {
    rect.set({ left: Math.abs(loc.x) });
  }
  if (canvas.origY > loc.y) {
    rect.set({ top: Math.abs(loc.y) });
  }
  rect.set({ width: Math.abs(canvas.origX - loc.x) });
  rect.set({ height: Math.abs(canvas.origY - loc.y) });
};


exports.createEllipse = function(loc, options) {
  return new fabric.Ellipse({
    top: loc.y,
    left: loc.x,
    originY: 'top',
    originX: 'center',
    rx: 1,
    ry: 1,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.lineWidth
  });
};
exports.updateEllipse = function(ellipse, loc) {
  if (canvas.origX > loc.x) {
    ellipse.set({ left: Math.abs(loc.x) });
  }
  if (canvas.origY > loc.y) {
    ellipse.set({ top: Math.abs(loc.y) });
  }
  ellipse.set({rx: Math.abs(canvas.origX - loc.x)});
  ellipse.set({ry: Math.abs(canvas.origY - loc.y)});
};