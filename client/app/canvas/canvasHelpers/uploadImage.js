var fabric = require('../../../lib/fabric/dist/fabric').fabric;
var canvas = require('../canvas').canvas;

/**
* Helper function that handles image uploads
* @param      {Object}   e event object 
* @param      {Object}   canvas canvas object
* @param      {Function}   cb a callback that is called on image render
*/
module.exports = function(e, canvas, cb) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var imgObj = new Image();
    imgObj.src = event.target.result;
    imgObj.onload = function() {
      var image = new fabric.Image(imgObj);
      image.set({
        angle: 0,
        padding: 10,
        cornersize: 10,
        height: 150,
        width: 150 
      });
      canvas.centerObject(image);
      canvas.add(image);
      canvas.renderAll();
      cb();
    };
  };
  reader.readAsDataURL(e.target.files[0]);
};