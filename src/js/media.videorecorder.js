export async function RecordVideo(container) {

    let cameraOptions = {},
        mediaType = "video/webm",
        mediaExtn = "webm",
        media_recorder = null,
        camera_stream = null,
        blobs_recorded = [],
        start_time = null,
        duration = 0,
        blob = null,
        stopped = false,
        preview = document.getElementById('popover_videoElement');

    if (typeof MediaRecorder.isTypeSupported == 'function') {
        // h264 unreliable in firefox, whereas webm works in both firefox and chrome
        if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) { // chrome
            cameraOptions = {mimeType: 'video/webm;codecs=h264'};
            mediaType = "video/webm;codecs=h264";
        } else if (MediaRecorder.isTypeSupported('video/webm')) { // chrome, firefox
            cameraOptions = {mimeType: 'video/webm'};
            mediaType = "video/webm";
        } else if (MediaRecorder.isTypeSupported('video/mp4;codecs=h264')) { // safari
            cameraOptions = {mimeType: 'video/mp4;codecs=h264' };
            mediaExtn = "mp4";
            mediaType = "video/mp4";
        } else if (MediaRecorder.isTypeSupported('video/mp4')) { // safari
            cameraOptions = {mimeType: 'video/mp4', videoBitsPerSecond : 256 * 8 * 1024};
            mediaExtn = "mp4";
            mediaType = "video/mp4";
        }
    }

    container.innerHTML = `<div class='recorder-flex'>
            <div class='control'>
                <button class='start-button ready'>Start recording</button>
                <label class='button-like'><input type='checkbox' checked/> Record cursor</label>
            </div>
            <div class='result'><video id='video-preview' playsinline autoplay controls /></div>
            <div class='control'>
                <button class='use-button' disabled>Use recording</button>
                <button class='cancel'>Cancel</button>
            </div>
        </div>`;

    const startButton = container.querySelector('.start-button');
    const useButton = container.querySelector('.use-button');
    // const result = container.querySelector('.result');
    const cancel = container.querySelector('.cancel');
    const video = document.getElementById('video-preview');

    connectVideo();

    startButton.addEventListener('click', startRecording);
    useButton.addEventListener('click', useRecording);
    cancel.addEventListener('click', cancelRecording);

    async function connectVideo() {
        try {
            camera_stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: { width: 854, height: 480 }
            });
        }
        catch(error) {
            alert(error.message);
        }
        video.srcObject = camera_stream;
    }

    function hideResult() {
        preview.setAttribute('hidden', true);
        preview.removeAttribute('src');
    }

    function showResult() {
        preview.removeAttribute('hidden');
        preview.setAttribute('controls', 'controls');
        preview.setAttribute('playsinline', 'true');
        preview.src = URL.createObjectURL(blob);
    }

    function startRecording() {
        hideResult();
        start_time = Date.now();

        startButton.textContent = 'Stop recording';
        startButton.classList.toggle('recording');
        startButton.removeEventListener('click', startRecording);
        startButton.addEventListener('click', stopRecording);
        useButton.setAttribute('disabled',true);

        media_recorder = new MediaRecorder(camera_stream, cameraOptions);
        blobs_recorded = [];
        stopped = false;

        media_recorder.addEventListener('dataavailable', function(e) {
            if (!stopped) {
                blobs_recorded.push(e.data);
            }
        });

        media_recorder.start(1000);
    }

    function stopRecording() {

        stopped = true;
        duration = Date.now() - start_time;

        startButton.textContent = 'Start recording';
        startButton.classList.toggle('recording');
        startButton.removeEventListener('click', stopRecording);
        startButton.addEventListener('click', startRecording);

        blob = new Blob(blobs_recorded, { type: mediaType });

        showResult();

        useButton.removeAttribute('disabled');
    }

    async function useRecording() {
        if (mediaExtn === 'webm' && blob) {
            blob = await ysFixWebmDuration(blob, duration, {logger: false});
        }
        // detect the type and perform conversion if required, then save
        popover_audioUpload(new File([blob], "recording." + mediaExtn));
    }

    function cancelRecording() {
        popover_cancelMedia();
    }

}
