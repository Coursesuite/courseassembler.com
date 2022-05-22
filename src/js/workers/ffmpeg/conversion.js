importScripts('ffmpeg-worker-all.js');

function StdOut(text) {
    postMessage({
        'type' : 'stdout',
        'data' : text
    });
}

function StdErr(text) {
    postMessage({
        'type' : 'stderr',
        'data' : text
    });
}

self.addEventListener('message', function(event) {
    var message = event.data;
    // console.log(JSON.stringify(message, null, "  "));
    console.log(message);
    if (message.type === "command") {
        postMessage({
            'type' : 'start',
        });
                      
        var Module = {
            print: StdOut,
            printErr: StdErr,
            files: message.files || [],
            arguments: message.arguments || []
        };
                      
        postMessage({
            'type' : 'stdout',
            'data' : 'Received command: ' + Module.arguments.join(" ")
        });

    console.log(Module);

        var time = Date.now();
        var result = ffmpeg_run(Module);
        var totalTime = Date.now() - time;

        postMessage({
            'type' : 'stdout',
            'data' : 'Finished processing (took ' + totalTime + 'ms)'
        });
        
        // use transferrable objects
		
		//debugger;
        var buffers = [];
        for (var i in result.outputFiles) {
            buffers.push(result.outputFiles[i]);
        }/**/
        var buffers = [];              
        postMessage({
            'type' : 'done',
            'data' : result
        }, buffers);
    }
}, false);

// ffmpeg loaded
postMessage({
    'type' : 'ready'
});
