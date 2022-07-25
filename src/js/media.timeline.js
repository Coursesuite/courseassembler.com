import AudioSVGWaveform from './audio-waveform-svg-path/index.js';

// console.dir(import.meta);

export function GenerateThumbnails(video, destination) {

    return new Promise(function(resolve, reject) {

    // adapted from https://jsfiddle.net/kmturley/z99cmwtq/

    var time = 0,
        ended = false,
        stageW = destination.offsetWidth,
        stageH = 100,
        w,h,
        step = 1,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        left = 0,
        duration = 1,
        ratio = .5625;

    canvas.width = stageW;
    canvas.height = stageH;
    destination.innerHTML = '';
    destination.appendChild(canvas);

    video.addEventListener('loadedmetadata', function(e) {
        duration = e.target.duration;
        step = Math.max(10, parseInt(stageW / duration, 10));
        w = step,
        left = -w;
        h = parseInt(w * ratio, 10);
        ratio = video.videoHeight / video.videoWidth;
        console.log('loadedmetadata', duration, step, w, h, ratio);
    });

    // start - SHOULD occur after loadedmetadata
    video.addEventListener('loadeddata', function (e) {
        Step();
        console.log('loadeddata');
    }, false);

    // stepping to a frame draws the image currently on the video
    video.addEventListener('seeked', function() {
        ctx.drawImage(video, left, 0, w, h);
        Step();
    }, false);

    // often doesn't fire
    video.addEventListener('ended', function (e) {
        End();
        console.log('ended');
    }, false);

    // step to the next frame, if any
    function Step() {
        if (ended === false) {
            video.currentTime = time;
            time += 1;
            left += w;
            if (time > step) End();
        }
    };

     // catch runaway condition if ended doesn't fire
    function End() {
        ended = true;
        video.currentTime = 0;
        resolve();
    }

    });

}

export function setVideoPoster(source) {
    async function poster() {
        return new Promise(async (resolve) => {
            let videoBlob = await fetch(source.src).then(r => r.blob());
            let videoObjectUrl = URL.createObjectURL(videoBlob);
            let video = document.createElement("video");
            video.src = videoObjectUrl;
            video.addEventListener('seeked', () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(videoObjectUrl);
                resolve(canvas.toDataURL());
            });
            video.currentTime = 1; // assume videos are at least 1 second long;
        });
    };
    (async () => {
        source.poster = await poster(source);
    })();
}


// duration isn't known until the video is loaded
async function getVideoDuration(source) {
    return new Promise(async (resolve) => {
        let videoBlob = await fetch(source.src).then(r => r.blob());
        let videoObjectUrl = URL.createObjectURL(videoBlob);
        let video = document.createElement("video");
        video.src = videoObjectUrl;
        let iter = 0;
        while((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2 && iter++ < 999) {
            await new Promise(r => setTimeout(r, 100));
            video.currentTime = 10000000*Math.random();
        }
        let duration = video.duration;
        URL.revokeObjectURL(videoObjectUrl);
        videoBlob = null;
        video.src = null;
        resolve(duration);
    });
}


// janky div for video position
// export function CueIndicator(video, destination) {
//   let cue = document.createElement('div');
//   cue.classList.add('cue-indicator');
//   destination.appendChild(cue);
//   video.addEventListener('timeupdate', function(e) {
//     cue.style.left = (e.target.currentTime / e.target.duration * 100) + '%';
//   });
// }

// use a range control to show and listen to video position;
// toggle clicking video to pause/play
export function CueControl(video, destination, button) {
    let control = document.createElement('input');
    control.type = 'range';
    control.className = 'cue';
    control.min = 0;
    control.value = 0;
    control.step = "any";
    control.addEventListener('change', (e) => { video.currentTime = e.target.value });
    video.addEventListener('timeupdate', (e) => { control.value = e.target.currentTime });
    video.addEventListener('pause', () => { button.dataset.state = 'pause'; });
    video.addEventListener('play', () => { button.dataset.state = 'play'; });
    video.addEventListener('ended', () => { button.dataset.state = 'stop'; });
    button.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else if (video.ended) {
            video.currentTime = 0;
            video.play();
        } else if (!video.paused) {
            video.pause();
        }
    });
    // video.addEventListener('click', (e) => { e.target[e.target.paused ? 'play' : 'pause'](); e.target.parentNode.classList[e.target.paused ? 'add' : 'remove']('paused'); });
    destination.appendChild(control);
    video.parentNode.classList.add('paused');
    (async () => {
        let duration = await getVideoDuration(video);
        control.max = duration;
    })();
}

async function extractFramesFromVideo(videoUrl, cw, ch, context) { // fps=25) {
  return new Promise(async (resolve) => {

    // fully download it first (no buffering):
    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let thumbs = Math.ceil(cw / ch); // number of thumbnails to generate

    let seekResolve;
    video.addEventListener('seeked', async function() {
      if(seekResolve) seekResolve();
    });

    video.src = videoObjectUrl;

    // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
    while((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2) {
      await new Promise(r => setTimeout(r, 1000));
      video.currentTime = 10000000*Math.random();
    }
    let duration = video.duration;
    let interval = duration / thumbs;

    let [w, h] = [video.videoWidth, video.videoHeight];
    let left = 0;
    let currentTime = 0;

    while(currentTime < duration) {
      video.currentTime = currentTime;
      await new Promise(r => seekResolve=r);
      context.drawImage(video, 0,0,w,h, left,0,ch,ch); // extract square thumb from video
      left += ch;
      currentTime += interval;
    }
    videoBlob = null;
    video.src = null;
    URL.revokeObjectURL(videoObjectUrl);
    resolve();
  });
};

export function VideoThumbnails(div) {
    async function videoFrames2Canvas(videoUrl, container) {
        return new Promise(async (resolve) => {

            if (!videoUrl) resolve(document.createElement('span'));

            // fully download it first (no buffering):
            let videoBlob = await fetch(videoUrl).then(r => r.blob());
            let videoObjectUrl = URL.createObjectURL(videoBlob);
            let video = document.createElement("video");
            let seekResolve;

            let thumbs = Math.ceil(container.offsetWidth / container.offsetHeight); // number of thumbnails to generate

            video.addEventListener('seeked', async function() {
                if (seekResolve) seekResolve();
            });

            video.src = videoObjectUrl;

            // workaround chromium metadata bug (https://stackoverflow.com/q/38062864/993683)
            while((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2) {
                await new Promise(r => setTimeout(r, 1000));
                video.currentTime = 10000000*Math.random();
            }

            let duration = video.duration;
            let interval = duration / thumbs;

            let [w, h] = [video.videoWidth, video.videoHeight];
            let left = 0;
            let currentTime = 0;

            // calculating the size here has allowed the DOM flexbox painter to have finished sizing the container
            let canvas = document.createElement('canvas'),
                context = canvas.getContext('2d');
            canvas.width = container.offsetWidth,
            canvas.height = container.offsetHeight;

            while(currentTime < duration) {
                video.currentTime = currentTime;
                await new Promise(r => seekResolve=r);
                context.drawImage(video, 0,0,w,h, left,0,canvas.height,canvas.height); // extract square thumb from video
                left += canvas.height;
                currentTime += interval;
            }
            videoBlob = null;
            video.src = null;
            URL.revokeObjectURL(videoObjectUrl);

            // finished painting the canvas, so now we can put it in the DOM
            resolve(canvas);
        });
    };

    return new Promise(function(resolve, reject) {
        div.textContent = 'Loading...';
        (async () => {
            videoFrames2Canvas(div.dataset.src, div)
            .then((result) => div.replaceChildren(result))
            .finally(resolve);
        })();
    });
}

export function GenerateWaveyform(audio, destination) {

    // https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
    // licence: gpl-3.0

    const canvas = document.createElement('canvas');
    destination.innerHTML = '';
    destination.appendChild(canvas);

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    const drawAudio = url => {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => draw(normalizeData(filterData(audioBuffer))));
        };

        const filterData = audioBuffer => {
        const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
        const samples = 255; // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        return filteredData;
    };

    const normalizeData = filteredData => {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map(n => n * multiplier);
    }

    const draw = normalizedData => {
        const dpr = window.devicePixelRatio || 1;
        const padding = 0;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);
        ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

        // draw the line segments
        const width = canvas.offsetWidth / normalizedData.length;
        for (let i = 0; i < normalizedData.length; i++) {
            const x = width * i;
            let height = normalizedData[i] * canvas.offsetHeight - padding;
            if (height < 0) {
                height = 0;
            } else if (height > canvas.offsetHeight / 2) {
                height = height > canvas.offsetHeight / 2;
            }
            drawLineSegment(ctx, x, height, width, (i + 1) % 2);
        }
    };

    const drawLineSegment = (ctx, x, height, width, isEven) => {
        ctx.lineWidth = 1; // how thick the line is
        ctx.strokeStyle = "#666"; // what color our line is
        ctx.beginPath();
        height = isEven ? height : -height;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
        ctx.lineTo(x + width, 0);
        ctx.stroke();
    };

    drawAudio(audio.src);

}

export function DrawWaveform(div) {

    return new Promise(function(resolve, reject) {

        (async () => {  
            let blob = await fetch(div.dataset.src).then(r => r.blob());
            let url = URL.createObjectURL(blob);
            let audio = document.createElement("audio");
            audio.src = url;

            GenerateWaveform(audio, div);
            blob = null;
            URL.revokeObjectURL(url);
            audio.src = undefined;
            resolve();
        })();

    });

}


export function GenerateWaveform(audio, destination) {

    return new Promise(function(resolve, reject) {
        destination.textContent = "Loading...";
        const peakCount = destination.offsetWidth / 2; // 384;
        const trackWaveform = new AudioSVGWaveform({url: audio.src, peaks: peakCount});
        trackWaveform.loadFromUrl().then(() => {
            const path = trackWaveform.getPath();
            destination.replaceChildren();
            if (path) {
                destination.innerHTML = `<svg viewBox='0 -1 ${peakCount} 2' preserveAspectRatio='none'><g><line x1='0' y1='0' x2='${peakCount}' y2='0' stroke-width='0.01'/><path d='${path}'/></g></svg>`;
            }
            // root.style.setProperty('--waveform-length', destination.querySelector('path').getTotalLength());
            resolve();
        }).catch(err => reject);

    });

}

export function BindMouseover(element) {

    const root = document.documentElement;
    const dx = document.createElement('div'); dx.className = 'dx';
    let rect = element.getBoundingClientRect();
    element.addEventListener('resize', () => {
        rect = element.getBoundingClientRect();
    });
    element.appendChild(dx);
    element.addEventListener('mousemove', evt => {
        let x = evt.clientX - rect.left;
        root.style.setProperty('--mouse-x', x + 'px');
    });
}

// show the media control and make it draggable in case it is in the way
export function RenderMediaControl(control) {

    if (!control) return;

    let initX, initY, firstX, firstY;

    if (control.src) {
        control.removeAttribute('hidden');
        control.setAttribute('controls', 'controls');
        makeDraggable();
        const dx = document.createElement('div'); dx.className = 'dx'; document.querySelector('.timeline-display').appendChild(dx);
        document.getElementById('pageMediaProperties').innerHTML = '<i class="ninja-timer" title="Duration"></i>' + formatSeconds(control.duration,'??:??');
        control.addEventListener('timeupdate', (evt) => {
            const time = evt.target.currentTime;
            const duration = evt.target.duration;
            const percent = (time / duration) * 100;
            document.documentElement.style.setProperty('--media-control-pc', percent + '%');
        });
    } else {
        control.setAttribute('hidden','hidden');
        control.removeAttribute('controls');
        $('.dx').remove();$('.media-metadata').remove();
        stopDraggable();
    }

    function stopDraggable() {
        control.removeEventListener('mousedown', down);
        control.removeEventListener('touchstart', down);
    }

    function makeDraggable() {
        if (control.id === 'popover_audioElement') return ; // not allowed to capture mouse events from the control surface; video works since you can drag the canvas
        control.addEventListener('mousedown', down, false);
        control.addEventListener('touchstart', down, false);
        control.style.removeProperty('bottom');
        control.style.removeProperty('right');
    }

    function down(e) {
        e.preventDefault();
        initX = this.offsetLeft;
        initY = this.offsetTop;
        firstX = e.touches ? e.touches[0].pageX : e.pageX;
        firstY = e.touches ? e.touches[0].pageY : e.pageY;

        this.addEventListener('mousemove', dragIt, false);
        window.addEventListener('mouseup', function() {
            control.removeEventListener('mousemove', dragIt, false);
        }, false);

        this.addEventListener('touchmove', swipeIt, false);
        window.addEventListener('touchend', function(e) {
            e.preventDefault();
            control.removeEventListener('touchmove', swipeIt, false);
        }, false);

    }
    function dragIt(e) {
        this.style.left = initX+e.pageX-firstX + 'px';
        this.style.top = initY+e.pageY-firstY + 'px';
    }

    function swipeIt(e) {
        var contact = e.touches;
        this.style.left = initX+contact[0].pageX-firstX + 'px';
        this.style.top = initY+contact[0].pageY-firstY + 'px';
    }
}