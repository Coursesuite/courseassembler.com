export async function RecordVideo(DocNinja) {

	const container = document.getElementById('propertyContainer');
	container.innerHTML = Handlebars.templates["properties-media"]({
		recordVideo: true,
		showActions: false
	});

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
		mus;

	//	preview = document.getElementById('popover_videoElement'),

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

    const startButton = container.querySelector('.start-button');
    const useButton = container.querySelector('.use-button');
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
		video.setAttribute('autoplay', true);
		video.removeEventListener('play', cursorPlay);
		video.removeEventListener('pause', cursorPause);
    }

    // function hideResult() {
    //     preview.setAttribute('hidden', true);
    //     preview.removeAttribute('src');
    //     preview.removeEventListener('play', cursorPlay);
    //     preview.removeEventListener('pause', cursorPause);
    // }

    // function showResult() {
    //     preview.removeAttribute('hidden');
    //     preview.setAttribute('controls', 'controls');
    //     preview.setAttribute('playsinline', 'true');
    //     preview.src = URL.createObjectURL(blob);
    //     preview.addEventListener('play', cursorPlay);
    //     preview.addEventListener('pause', cursorPause);
    // }

    function startRecording() {
        //hideResult();
		connectVideo();
        start_time = Date.now();
		if (mus) mus.release();
		if (DocNinja.options.RECORDCURSOR) {
			mus = new Mus({
				target: document.getElementById('preview-frame').contentWindow
			});
		}

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

		if (DocNinja.options.RECORDCURSOR) {
			mus.startedAt = 0;
			mus.frames = [];
			mus.record();
		}

        media_recorder.start(1000);
    }

	function cursorPlay(e) {
		if (!DocNinja.options.RECORDCURSOR) return;
		var ct = e.target.currentTime;
		mus.cue(ct);
	}

	function cursorPause(e) {
		if (!DocNinja.options.RECORDCURSOR) return;
		mus.pause();
	}

    function stopRecording() {

        stopped = true;
        duration = Date.now() - start_time;
		media_recorder.stop();
		video.pause();

        if (DocNinja.options.RECORDCURSOR) {
            mus.stop();
        }

        startButton.textContent = 'Start recording';
        startButton.classList.toggle('recording');
        startButton.removeEventListener('click', stopRecording);
        startButton.addEventListener('click', startRecording);

		video.addEventListener('play', cursorPlay);
		video.addEventListener('pause', cursorPause);
		video.removeAttribute('autoplay');

        blob = new Blob(blobs_recorded, { type: mediaType });

        // showResult();
		video.srcObject = null;
		video.src = URL.createObjectURL(blob);

        useButton.removeAttribute('disabled');
    }

    async function useRecording() {
        if (mediaExtn === 'webm' && blob) {
            blob = await ysFixWebmDuration(blob, duration, {logger: false});
        }

		container.innerHTML = Handlebars.templates["properties-media"]({
			processVideo: true,
			showActions: false
		});

		popover_processMedia({
			file: new File([blob], "recording." + mediaExtn),
			cursor: DocNinja.options.RECORDCURSOR ? mus.getData() : undefined
		});

        // // detect the type and perform conversion if required, then save
        // popover_audioUpload(new File([blob], "recording." + mediaExtn));
        // if (cursor.checked && mus) popover_saveMouseRecording(mus.getData());
    }

    function cancelRecording() {
        popover_cancelMedia();
    }

}
