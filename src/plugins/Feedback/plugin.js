(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
    let methods = DocNinja.Plugins.Feedback = DocNinja.Plugins.Feedback || {};
    let form, captureButton, output, submitButton;
    let screenshot = undefined;
    const captureText = 'Capture';

    const template = `
<div id="feedback">
<div class="action-icon">
    <button data-action="toggle-feedback">
        <span class="ninja-thumbs-down"></span>
        <span class="ninja-thumbs-up"></span>
    </button>
</div>
<div class="feedback-form">

    <div class="form-close">
        <b>App Feedback</b>
        <a href="mailto:support@courseassembler.com?subject=Feedback"><span class="ninja-envelope"></span> Send Email</a>
        <a href="" data-action="close-feedback"><span class="ninja-close"></span> Close</a>
    </div>

    <div class="form-row">
        <label>Type</label>
        <select required>
            <option>Question</option>
            <option>Suggestion</option>
            <option>Bug</option>
            <option>Other</option>
        </select>
    </div>

    <div class="form-row">
        <label>Details</label>
        <textarea placeholder="Enter details" rows="10" cols="40" required></textarea>
    </div>

    <div class="form-row">
        <label>Screenshot <span>(optional)</span></label>
        <a data-action="capture-screenshot">${captureText}</a>
    </div>

    <output></output>

    <div class="form-submit">
        <button data-action="submit-feedback">Submit</button>
    </div>

</div>
</div>
    `;

    const capture = async () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const video = document.createElement("video");

        output.textContent = '';

        let w = window.width || window.innerWidth || 1920;
        let h = window.height || window.innerHeight || 1080;

        canvas.width = w;
        canvas.height = h;

        const displayMediaOptions = {
            audio: false,
            video: true
        };

        try {
            const captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            video.srcObject = captureStream;
            await video.play(); // important
            context.drawImage(video, 0, 0, w, h);
            const frame = canvas.toDataURL("image/png");
            captureStream.getTracks().forEach(track => track.stop());
            return Promise.resolve(frame);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    function snooze(time) { return new Promise(resolve => setTimeout(resolve, time))}

    function reset() {
        form.classList.remove('capturing');
        form.classList.remove('open');
        output.textContent = '';
        screenshot = undefined;
        captureButton.innerText = captureText;
        captureButton.classList.remove('trash');
        submitButton.textContent = 'Submit';
        form.querySelector('textarea').value = '';
        form.querySelector('select').selectedIndex = 0;
        console.trace();
    }

    function updatePreview() {
        form.classList.remove('capturing');
        captureButton.classList.remove('trash');
        if (typeof screenshot === 'undefined') {
            captureButton.innerText = captureText;
        } else {
            captureButton.innerHTML = `<img src="${screenshot}">`;
            captureButton.classList.add('trash');
        }
    }

    methods.captureScreenshot = function() {
        if (typeof screenshot === 'undefined') { // capture
            form.classList.add('capturing');
            capture().then(function(data) {
                screenshot = data;
            }).catch((msg) => {
                screenshot = undefined;
                console.error(msg);
                output.textContent = 'Error capturing screenshot / blocked';
            }).finally(() => {
                updatePreview();
            });
        } else { // trash
            screenshot = undefined;
            updatePreview();
        }
    }

    methods.toggleFeedback = function(option, e) {
        e = (arguments.length===1) ? option : e;
        e.preventDefault();
        console.log(option, e);
		if (option === 0 || (!option && e)) {
            reset();
        } else {
            form.classList.toggle('open');
        }
        form.querySelector('output').innerHTML = '';
	}

    methods.submitFeedback = function(e) {
        output.textContent = '';
        const ta = form.querySelector('textarea').value.trim();
        if (!ta.length) return output.textContent = 'Please enter some text';
        (async () => {
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hash: App.Hash,
                    select: form.querySelector('select').value,
                    textarea: form.querySelector('textarea').value,
                    image: screenshot
                })
            }
            submitButton.innerHTML = "<span class='ninja-spinner'></span> Uploading";
            const response = await fetch(App.Feedback, options);
            const data = await response.json();
            if (data.ok) {
                submitButton.innerHTML = '<span class="ninja-check-square"></span> Submitted!';
                await snooze(1234);
                DocNinja.Plugins.Feedback.toggleFeedback(0, e);
            } else {
                output.innerHTML = '😖! A 🐞 occurred during upload. Maybe try email?';
                submitButton.textContent = 'Submit';
            }
        })();
    }


    methods.RegisterPlugin = function(context) {
		DocNinja.routines.AttachUI(document.body, template);
        form = document.querySelector('#feedback');
        captureButton = form.querySelector('[data-action="capture-screenshot"]');
        output = form.querySelector('output');
        submitButton = form.querySelector('[data-action="submit-feedback"]');
		DocNinja.routines.RegisterActions([{
			plugin: context,
			type: 'ui',
            match: 'close-feedback',
            fn: 'toggleFeedback',
            parameters: [0]
		},{
			plugin: context,
			type: 'ui',
            match: 'toggle-feedback',
            fn: 'toggleFeedback',
            parameters: []
		},{
			plugin: context,
			type: 'ui',
            match: 'submit-feedback',
            fn: 'submitFeedback',
            parameters: []
		},{
			plugin: context,
			type: 'ui',
            match: 'capture-screenshot',
            fn: 'captureScreenshot',
            parameters: []
        }]);
    }

    methods.Capture = capture;

})(window.DocNinja = window.DocNinja || {});