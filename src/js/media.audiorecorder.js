export function RecordAudio(DocNinja) {

  const container = document.getElementById('propertyContainer');
  container.innerHTML = Handlebars.templates["properties-media"]({
    recordAudio: true,
    showActions: false
  });

  const oscilliscope = document.createElement('canvas');
  const timeDisplay = document.createElement('div');
  const useButton = container.querySelector('.use-button');
  const startButton = container.querySelector('.start-button');
  const result = container.querySelector('.result');
  const cancel = container.querySelector('.cancel');
  const recorder = new MicRecorder({
      bitrate: 128
  });

  oscilliscope.classList.add('oscilliscope');
  timeDisplay.classList.add('time-display');
  timeDisplay.textContent = formatSeconds(0);

  let output = null,
    seconds = 0,
    tsi = null,
    mus;

  startButton.addEventListener('click', startRecording);
  useButton.addEventListener('click', useRecording);
  cancel.addEventListener('click', cancelRecording);

  result.innerHTML = '';
  result.appendChild(oscilliscope);
  result.appendChild(timeDisplay);

  function showTimer() {
    seconds++;
    timeDisplay.textContent = formatSeconds(seconds);
  }

  function startRecording() {
    seconds = 0;
    if (tsi) clearInterval(tsi);
    if (mus) mus.release();
    if (DocNinja.options.RECORDCURSOR) {
      mus = new Mus({
        target: document.getElementById('preview-frame').contentWindow
      });
    }

    recorder.start().then(function (stream) {

      // kick off the timer
      tsi = setInterval(showTimer,1000);

      if (DocNinja.options.RECORDCURSOR) {
          mus.startedAt = 0;
          mus.frames = [];
          mus.record();
      }

      startButton.textContent = 'Stop';
      startButton.classList.toggle('recording');
      startButton.removeEventListener('click', startRecording);
      startButton.addEventListener('click', stopRecording);
      audioVisualize(oscilliscope, stream);
      useButton.setAttribute('disabled',true);

    }).catch((e) => {
      console.error(e);
    });
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
    clearInterval(tsi);
    if (DocNinja.options.RECORDCURSOR) {
        mus.stop();
    }
    recorder.stop().getMp3().then(([buffer, blob]) => {
      // console.log(buffer, blob);
      const file = new File(buffer, 'music.mp3', {
        type: blob.type,
        lastModified: Date.now()
      });

      output = blob;

      const player = new Audio(URL.createObjectURL(file));
      player.controls = true;
      player.addEventListener('play', cursorPlay);
      player.addEventListener('pause', cursorPause);

      result.innerHTML = '';
      result.appendChild(player);

      useButton.removeAttribute('disabled');

      startButton.textContent = 'Record audio';
      startButton.classList.toggle('recording');
      startButton.removeEventListener('click', stopRecording);
      startButton.addEventListener('click', startRecording);
    }).catch((e) => {
      console.error(e);
    });
  }

  function useRecording() {
    if (!output) return;
    let params = {
      "payload.mp3": output,
      "payload.cursor": DocNinja.options.RECORDCURSOR ? mus.getData() : undefined
    }
    popover_saveMedia(params);
  }

  function cancelRecording() {
    popover_cancelMedia();
  }

}
