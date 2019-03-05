/*
* based on https://github.com/rossturner/HTML5-ImageUploader/, MIT License
* requires https://github.com/exif-js/exif-js
new AutoScaler(imageDataUrl, {
    maxWidth: 800,
    maxHeight: 600,
    rotate: true,
    quality: 0.9,
    onComplete: function(newImageUrl) {

    }
});
*/
var AutoScaler = function(imgDataUrl, config) {
    if (config) this.setConfig(config);

    var img = document.createElement('img'),
        This = this;
    img.onload = function () {
        if ( (typeof EXIF.getData === "function") && (typeof EXIF.getTag === "function") ) {
            EXIF.getData(img, function() {
                var orientation = EXIF.getTag(this, "Orientation");
                This.scaleImage(img, orientation);
            });
        } else {
                This.scaleImage(img);
        }
    }
    img.src = imgDataUrl;
};

AutoScaler.prototype.setConfig = function(customConfig) {
    this.config = customConfig;
    this.config.quality = 1.00;
    if (!this.config.format)
        this.config.format = "image/jpeg";
    if (0.00 < customConfig.quality && customConfig.quality <= 1.00) {
        this.config.quality = customConfig.quality;
    }
    if ( (!this.config.maxWidth) || (this.config.maxWidth<0) ){
        this.config.maxWidth = 1024;
    }
    if ( (!this.config.maxHeight) || (this.config.maxHeight<0) ) {
        this.config.maxHeight = 1024;
    }
    if ( (!this.config.maxSize) || (this.config.maxSize<0) ) {
        this.config.maxSize = null;
    }
    if ( (!this.config.scaleRatio) || (this.config.scaleRatio <= 0) || (this.config.scaleRatio >= 1) ) {
        this.config.scaleRatio = null;
    }
    this.config.autoRotate = true;
    if (typeof customConfig.autoRotate === 'boolean')
        this.config.autoRotate = customConfig.autoRotate;
};

AutoScaler.prototype.scaleImage = function(img, orientation) {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.save();

    var width  = canvas.width;
    var styleWidth  = canvas.style.width;
    var height = canvas.height;
    var styleHeight = canvas.style.height;
    if (typeof orientation === 'undefined')
        orientation = 1;
    if (orientation) {
        if (orientation > 4) {
            canvas.width  = height;
            canvas.style.width  = styleHeight;
            canvas.height = width;
            canvas.style.height = styleWidth;
        }
        switch (orientation) {
            case 2:
                ctx.translate(width, 0);
                ctx.scale(-1,1);
                break;
            case 3:
                ctx.translate(width,height);
                ctx.rotate(Math.PI);
                break;
            case 4:
                ctx.translate(0,height);
                ctx.scale(1,-1);
                break;
            case 5:
                ctx.rotate(0.5 * Math.PI);
                ctx.scale(1,-1);
                break;
            case 6:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(0,-height);
                break;
            case 7:
                ctx.rotate(0.5 * Math.PI);
                ctx.translate(width,-height);
                ctx.scale(-1,1);
                break;
            case 8:
                ctx.rotate(-0.5 * Math.PI);
                ctx.translate(-width,0);
                break;
        }
    }
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    //Let's find the max available width for scaled image
    var ratio = canvas.width/canvas.height;
    var mWidth = Math.min(this.config.maxWidth, ratio*this.config.maxHeight);
    if ( (this.config.maxSize>0) && (this.config.maxSize<canvas.width*canvas.height/1000) )
        mWidth = Math.min(mWidth, Math.floor(Math.sqrt(this.config.maxSize*ratio)));
    if ( !!this.config.scaleRatio )
        mWidth = Math.min(mWidth, Math.floor(this.config.scaleRatio*canvas.width));
    if (mWidth<=0){
        mWidth = 1;
    }
    while (canvas.width >= (2 * mWidth)) {
        canvas = this.getHalfScaleCanvas(canvas);
    }

    if (canvas.width > mWidth) {
        canvas = this.scaleCanvasWithAlgorithm(canvas, mWidth);
    }

    var imageData = canvas.toDataURL(this.config.format, this.config.quality);
    if (typeof this.config.onComplete === 'function')
        this.config.onComplete(imageData);
};

AutoScaler.prototype.scaleCanvasWithAlgorithm = function(canvas, maxWidth) {
    var scaledCanvas = document.createElement('canvas');

    var scale = maxWidth / canvas.width;

    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;

    var srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    var destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);

    this.applyBilinearInterpolation(srcImgData, destImgData, scale);

    scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);

    return scaledCanvas;
};

AutoScaler.prototype.getHalfScaleCanvas = function(canvas) {
    var halfCanvas = document.createElement('canvas');
    halfCanvas.width = canvas.width / 2;
    halfCanvas.height = canvas.height / 2;

    halfCanvas.getContext('2d').drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

    return halfCanvas;
};

AutoScaler.prototype.applyBilinearInterpolation = function(srcCanvasData, destCanvasData, scale) {
    function inner(f00, f10, f01, f11, x, y) {
        var un_x = 1.0 - x;
        var un_y = 1.0 - y;
        return (f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y);
    }
    var i, j;
    var iyv, iy0, iy1, ixv, ix0, ix1;
    var idxD, idxS00, idxS10, idxS01, idxS11;
    var dx, dy;
    var r, g, b, a;
    for (i = 0; i < destCanvasData.height; ++i) {
        iyv = i / scale;
        iy0 = Math.floor(iyv);
        // Math.ceil can go over bounds
        iy1 = (Math.ceil(iyv) > (srcCanvasData.height - 1) ? (srcCanvasData.height - 1) : Math.ceil(iyv));
        for (j = 0; j < destCanvasData.width; ++j) {
            ixv = j / scale;
            ix0 = Math.floor(ixv);
            // Math.ceil can go over bounds
            ix1 = (Math.ceil(ixv) > (srcCanvasData.width - 1) ? (srcCanvasData.width - 1) : Math.ceil(ixv));
            idxD = (j + destCanvasData.width * i) * 4;
            // matrix to vector indices
            idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
            idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
            idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
            idxS11 = (ix1 + srcCanvasData.width * iy1) * 4;
            // overall coordinates to unit square
            dx = ixv - ix0;
            dy = iyv - iy0;
            // I let the r, g, b, a on purpose for debugging
            r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy);
            destCanvasData.data[idxD] = r;

            g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy);
            destCanvasData.data[idxD + 1] = g;

            b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy);
            destCanvasData.data[idxD + 2] = b;

            a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy);
            destCanvasData.data[idxD + 3] = a;
        }
    }
};