function whichAnimationEvent(){
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var animationEvent = whichAnimationEvent();

// 0. iframe.over is what is currently shown to the user and is the opposite of the iframe firing this function
// 1. iframe.under has its onload and src set
// 2. iframe.under fires onload (this fn)
// 3. iframe.under has its onload removed (now neither iframe has an onload)
// 4. iframe.over is changed to iframe.under
// 5. iframe.under is changed to iframe.over
function iframe(under) {
	under.removeAttribute("onload"); // prevent retrigering
	var over = under.previousElementSibling ? under.previousElementSibling : under.nextElementSibling ? under.nextElementSibling : null;
	doOnce(over,animationEvent,reclassifyIframes); // triggered animation-end then removes event listener to prevent multiple binds over time
	over.className = "fadeOut"; // starts animation
	if (window._audio) window._audio.play();
}

function reclassifyIframes(el) {
	var other = el.target.previousElementSibling ? el.target.previousElementSibling : el.target.nextElementSibling ? el.target.nextElementSibling : null;
	other.className = "over"; // the element that was not faded becomes over, which cycles its z-index
	el.target.className = "under"; // the element that faded out becomes under for next time
	el.target.removeAttribute('src');
}

function doOnce(element, eventType, callback) {
	element.addEventListener(eventType, function(e) {
		e.target.removeEventListener(e.type, arguments.callee);
		return callback(e);
	});
}