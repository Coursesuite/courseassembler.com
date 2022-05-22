export function ConvertToMp3(inputFile) {
    return new Promise(function (resolve, reject) {
        var t = new FileReader;
        t.onload = function(e) {
            var t = this.result,
                array = new Uint8Array(t);
            start_conversion(array, inputFile, function(data,name) {
                if (data) {
                    var o = new Blob([data])
                        , n = window.URL.createObjectURL(o)
                        , size = (data.byteLength / 1024 / 1024).toFixed(2).toString();
                    console.log("Converted to mp3: " + name + " (" + size + " MB)");
                    resolve(n);
                } else {
                    reject("Error converting to mp3");
                }
            });
        }
        t.readAsArrayBuffer(inputFile);
    });
}

function start_conversion(e, file, callback) {
    var w = new Worker("js/workers/ffmpeg/conversion.js"); // relative to where import() is executed
    w.onmessage = function(e) {
        var t = e.data;
        if ("ready" === t.type && window.File && window.FileList && window.FileReader)
            ;
        else if ("stdout" == t.type)
            console.warn(t.data);
        else if ("stderr" == t.type) {
            console.error(t.data);
        } else if ("done" == t.type) {
            var n = t.data.code
              , a = Object.keys(t.data.outputFiles);
            if (0 == n && a.length > 0 && t.data.outputFiles[a[0]].byteLength > 0) {
                var s = a[0]
                  , i = t.data.outputFiles[s];
                callback(i, s)
            } else
                callback(null)
        }
    }
    var args = [];
    args.push("-i "); args.push(file.name);
    args.push("-ab"); args.push("128k");
    args.push("-ar"); args.push("44100");
    args.push("-ac"); args.push("2");
    args.push("-acodec"); args.push("libmp3lame");
    args.push("audio.mp3");
    w.postMessage({
        type: "command",
        arguments: args,
        files: [{
            name: file.name,
            data: e
        }]
    })
}