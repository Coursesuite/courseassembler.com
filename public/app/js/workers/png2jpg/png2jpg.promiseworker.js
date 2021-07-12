// no documentation on how the path works
importScripts('promise-worker-register.js');
importScripts('zlib-worker.js');
importScripts('png-worker.js');
importScripts('jpeg-worker.js');

// console.info("png2jpg.promiseworker.js");

var globCount = 0;
registerPromiseWorker(function (msg) {
  globCount++;

  // console.log("registerPromiseWorker", globCount, msg);

  var data = msg.image,
        quality = msg.quality || 50;

  var png = new globalForPNGJS.PNG(data);
  var dec = png.decode(); // a RGBA uint8array which matches the width * height * 4

  var width = png.width, height = png.height;
  png = null; // free up memory
  var enc = new JPEGEncoder(quality);
  var jpegdata = enc.encode({data: dec, width: width, height: height}, quality);
  dec = null; // may as well

  // console.log("PromiseWorker will return", globCount, jpegdata.length);

  // return to the PromiseWorker
  return {
    name: msg.name,
    data: jpegdata,
    width: width,
    height: height
  };

});