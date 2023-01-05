/**
 * Create a video or audio preview including the Cursor recording
 * Video is controlled by the same player control as the audio track
 * @param DocNinja for access to options
 */
export function Preview(DocNinja) {

    const id = DocNinja.filePreview.CurrentFile();
    const control = document.getElementById('pageMediaPlayer');
    let mus, cursor, mp4;

    function createVideo(source) {
        let video = document.getElementById('video-overlay');
        if (!video) {
            video = document.createElement('video');
            const position = control.getBoundingClientRect();
            video.src = mp4;
            video.id = 'video-overlay';

            video.style.width = position.width + 'px';
            video.style.left = position.left + 'px';

            document.getElementById('add-documents').appendChild(video);
        }
        return video;
    }

    function onpause(event) {
        const video = document.getElementById('video-overlay');
        video.pause();
        if (cursor) {
            mus.pause();
        }
    }

    function onplay(event) {
        const video = createVideo();
        video.play();
        if (cursor) {
            var ct = event.target.currentTime;
            mus.cue(ct);
        }
    }

    function onended(event) {
        const video = document.getElementById('video-overlay');
        if (video) video.parentNode.removeChild(video);
    }

    localforage.getItem(id).then(function(obj) {

        cursor = property_exists(obj, "payload.cursor");

        if (property_exists(obj, "payload.mp4")) {
            let data = get_property(obj, "payload.mp4");
            mp4 = ('object' == typeof data) ? URL.createObjectURL(data) : data;
            createVideo();
        }

        if (cursor) {
            mus = new Mus({
                target: document.getElementById('preview-frame').contentWindow
            });
            mus.setData(get_property(obj, "payload.cursor"));
        } else if (mus) {
            mus.release();
        }

        control.addEventListener('pause', onpause);
        control.addEventListener('play', onplay);
        control.addEventListener('ended', onended);

    });

}