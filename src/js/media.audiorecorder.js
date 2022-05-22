export function RecordAudio(container) {

    container.innerHTML = `<div class='recorder-flex'>
        <div class='control'>
            <button class='start-button ready'>Start recording</button>
            <label class='button-like'><input type='checkbox' checked/> Record cursor</label>
        </div>
        <div class='result'>Waiting for recording</div>
        <div class='control'>
            <button class='use-button' disabled>Use recording</button>
            <button class='cancel'>Cancel</button>
        </div>
    </div>`;

    const oscilliscope = document.createElement('canvas');
    oscilliscope.classList.add('oscilliscope');
    const timeDisplay = document.createElement('div');

    const startButton = container.querySelector('.start-button');
    const useButton = container.querySelector('.use-button');
    const result = container.querySelector('.result');
    const cancel = container.querySelector('.cancel');

    const recorder = new MicRecorder({
        bitrate: 128
    });

    let output = null,
      seconds = 0,
      tsi = null;

    startButton.addEventListener('click', startRecording);
    useButton.addEventListener('click', useRecording);
    cancel.addEventListener('click', cancelRecording);

    function showTimer() {
      seconds++;
      timeDisplay.textContent = formatSeconds(seconds);
    }

    function startRecording() {
      seconds = 0;
      tsi = setInterval(showTimer,1000);
      recorder.start().then(function (stream) {
        startButton.textContent = 'Stop recording';
        startButton.classList.toggle('recording');
        startButton.removeEventListener('click', startRecording);
        startButton.addEventListener('click', stopRecording);
        result.innerHTML = '';
        result.appendChild(oscilliscope);
        result.appendChild(timeDisplay);
        audioVisualize(oscilliscope, stream);
        useButton.setAttribute('disabled',true);
      }).catch((e) => {
        console.error(e);
      });
    }

    function stopRecording() {
      clearInterval(tsi);
      recorder.stop().getMp3().then(([buffer, blob]) => {
        // console.log(buffer, blob);
        const file = new File(buffer, 'music.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });

        output = blob;

        const player = new Audio(URL.createObjectURL(file));
        player.controls = true;
        result.innerHTML = '';
        result.appendChild(player);

        useButton.removeAttribute('disabled');

        startButton.textContent = 'Start recording';
        startButton.classList.toggle('recording');
        startButton.removeEventListener('click', stopRecording);
        startButton.addEventListener('click', startRecording);
      }).catch((e) => {
        console.error(e);
      });
    }

    function useRecording() {
      if (!output) return;
      const reader = new FileReader();
      reader.onload = function(e) {
          popover_saveMedia(reader.result, "mp3");
          // which should then reinitialise the timeline display
      }
      reader.readAsDataURL(output);
    }

    function cancelRecording() {
      popover_cancelMedia();
    }

}
