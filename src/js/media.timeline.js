import AudioSVGWaveform from './audio-waveform-svg-path/index.js';

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
        console.log('step',video.currentTime,time,left,step);
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

export function GenerateWaveform(audio, destination) {

    return new Promise(function(resolve, reject) {

        const peakCount = destination.offsetWidth / 2; // 384;
        const trackWaveform = new AudioSVGWaveform({url: audio.src, peaks: peakCount});
        const root = document.documentElement;

        trackWaveform.loadFromUrl().then(() => {
            const path = trackWaveform.getPath();
            if (path) {
                destination.innerHTML = `<svg viewBox='0 -1 ${peakCount} 2' preserveAspectRatio='none'><g><line x1='0' y1='0' x2='${peakCount}' y2='0' stroke-width='0.01'/><path d='${path}'/></g></svg>`;
            } else {
                destination.innerHTML = 'No audio data available';
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
   // const dy = document.createElement('div'); dy.className = 'dy';
    element.addEventListener('resize', () => {
        rect = element.getBoundingClientRect();
    });
    element.appendChild(dx);
    //element.appendChild(dy);
    //console.log(element.innerHTML);
    element.addEventListener('mousemove', evt => {
        let x = evt.clientX - rect.left;
      //  let y = evt.clientY - rect.top;

        root.style.setProperty('--mouse-x', x + 'px');
      //  root.style.setProperty('--mouse-y', y + 'px');
    
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