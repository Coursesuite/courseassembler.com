'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var rec = document.querySelector('button[title="Record"]'),
    audio = document.querySelector("audio"),
    accept = document.querySelector('button[title="Use"]'),
    osc = document.getElementById('oscilloscope'),
    recorder = new MicRecorder(),
    dataBlob;

rec.addEventListener('click', startRecording);

function startRecording() {
  recorder.start().then(function (stream) {
    rec.classList.add("live");
    osc.classList.add('visible');
    audio.classList.remove('visible');
    audioVisualize(osc, stream);
    rec.removeEventListener('click', startRecording);
    rec.addEventListener('click', stopRecording);
    rec.innerHTML = '<i class="material-icons">fiber_manual_record</i> Stop';
    accept.removeEventListener('click', useRecording);
    accept.classList.remove('visible');
  }).catch(function (e) {
    console.error(e);
  });
}

function stopRecording() {
  recorder.stop().getMp3().then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        buffer = _ref2[0];
    dataBlob = _ref2[1];
    var file = new File(buffer, 'music.mp3', {
      type: dataBlob.type,
      lastModified: Date.now()
    });
    audio.src = URL.createObjectURL(file);
    rec.classList.remove("live");
    rec.innerHTML = '<i class="material-icons">fiber_manual_record</i> Start';
    osc.classList.remove('visible');
    audio.classList.add('visible');
    accept.classList.add('visible');
    rec.removeEventListener('click', stopRecording);
    rec.addEventListener('click', startRecording);
    accept.addEventListener('click', useRecording);
  }).catch(function (e) {
    console.error(e);
  });
}

function useRecording() {
  var reader = new FileReader();
  reader.onload = function(event) {
    // console.dir(reader.result);
    if (parent && typeof parent.popover_useRecording !== 'undefined') parent.popover_useRecording(reader.result);
  }
  reader.readAsDataURL(dataBlob);
}