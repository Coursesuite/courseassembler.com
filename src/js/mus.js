/*!
 * Mus.js v1.5.0
 * (c) 2018 Mauricio Giordano <giordano@inevent.us> - InEvent
 * (c) 2022 tim st. clair - https://github.com/frumbert
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
			(global.Mus = factory());
}(this, (function () {
	'use strict';

	// Mus default cursor icon based on OSx default cursor
	var cursorDown = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNSIgaGVpZ2h0PSIzNSI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTMuNTczIDEyLjAzNmMuNDgtLjE3OCAxLjQyNy0uMDY5IDEuNjc3LjQ3My4yMTMuNDYyLjM5NiAxLjI0MS40MDYgMS4wNzUuMDI0LS4zNjktLjAyNC0xLjE2Ny4xMzctMS41ODQuMTE3LS4zMDQuMzQ3LS41OS42ODYtLjY5LjI4NS0uMDg3LjYyLS4xMTcuOTE2LS4wNTYuMzEzLjA2NC42NDIuMjg3Ljc2NS41LjM2Mi42MjIuMzY4IDEuODk4LjM4NSAxLjgzLjA2NC0uMjcyLjA3LTEuMjI5LjI4My0xLjU4NC4xNDEtLjIzNS40OTctLjQ0NS42ODctLjQ3OS4yOTQtLjA1Mi42NTYtLjA2OC45NjQtLjAwOC4yNS4wNS41ODYuMzQ0LjY3Ny40ODcuMjIuMzQ0LjM0MiAxLjMxNi4zOCAxLjY1OC4wMTUuMTQxLjA3My0uMzkzLjI5Mi0uNzM2LjQwNi0uNjM5IDEuODQ0LS43NjMgMS44OTguNjQuMDI2LjY1My4wMi42MjMuMDIgMS4wNjMgMCAuNTE2LS4wMTIuODI4LS4wNCAxLjIwMi0uMDMuNC0uMTE2IDEuMzA0LS4yNCAxLjc0Mi0uMDg3LjMwMS0uMzcyLjk3OC0uNjU0IDEuMzg0IDAgMC0xLjA3NCAxLjI1LTEuMTkgMS44MTItLjExOC41NjMtLjA3OS41NjctLjEwMy45NjUtLjAyMy40LjEyMS45MjMuMTIxLjkyM3MtLjguMTA0LTEuMjM0LjAzNGMtLjM5LS4wNjItLjg3NS0uODQtMS0xLjA3OC0uMTcyLS4zMjgtLjUzOS0uMjY1LS42ODItLjAyMy0uMjI0LjM4My0uNzA5IDEuMDctMS4wNSAxLjExMy0uNjY5LjA4NC0yLjA1NS4wMy0zLjE0LjAyIDAgMCAuMTg1LTEuMDEtLjIyNy0xLjM1OC0uMzA1LS4yNi0uODMtLjc4NC0xLjE0NC0xLjA2bC0uODMyLS45MmMtLjI4My0uMzYtMS4wMDItLjkzLTEuMjQzLTEuOTg2LS4yMTMtLjkzNi0uMTkyLTEuMzk1LjAzNy0xLjc3LjIzMi0uMzguNjctLjU4OS44NTQtLjYyNS4yMDgtLjA0Mi42OTItLjAzOS44NzUuMDYyLjIyMy4xMjMuMzEzLjE2LjQ4OC4zOTEuMjMuMzA3LjMxMi40NTYuMjEzLjEyMS0uMDc2LS4yNjItLjMyMi0uNTk1LS40MzQtLjk3LS4xMDktLjM2LS40LS45NDMtLjM4LTEuNTI2LjAwOC0uMjIuMTAzLS43Ny44MzItMS4wNDIiLz48ZyBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iLjc1Ij48cGF0aCBzdHJva2UtbGluZWpvaW49InJvdW5kIiBkPSJNMTMuNTczIDEyLjAzNmMuNDgtLjE3OCAxLjQyNy0uMDY5IDEuNjc3LjQ3My4yMTMuNDYyLjM5NiAxLjI0MS40MDYgMS4wNzUuMDI0LS4zNjktLjAyNC0xLjE2Ny4xMzctMS41ODQuMTE3LS4zMDQuMzQ3LS41OS42ODYtLjY5LjI4NS0uMDg3LjYyLS4xMTcuOTE2LS4wNTYuMzEzLjA2NC42NDIuMjg3Ljc2NS41LjM2Mi42MjIuMzY4IDEuODk4LjM4NSAxLjgzLjA2NC0uMjcyLjA3LTEuMjI5LjI4My0xLjU4NC4xNDEtLjIzNS40OTctLjQ0NS42ODctLjQ3OS4yOTQtLjA1Mi42NTYtLjA2OC45NjQtLjAwOC4yNS4wNS41ODYuMzQ0LjY3Ny40ODcuMjIuMzQ0LjM0MiAxLjMxNi4zOCAxLjY1OC4wMTUuMTQxLjA3My0uMzkzLjI5Mi0uNzM2LjQwNi0uNjM5IDEuODQ0LS43NjMgMS44OTguNjQuMDI2LjY1My4wMi42MjMuMDIgMS4wNjMgMCAuNTE2LS4wMTIuODI4LS4wNCAxLjIwMi0uMDMuNC0uMTE2IDEuMzA0LS4yNCAxLjc0Mi0uMDg3LjMwMS0uMzcyLjk3OC0uNjU0IDEuMzg0IDAgMC0xLjA3NCAxLjI1LTEuMTkgMS44MTItLjExOC41NjMtLjA3OS41NjctLjEwMy45NjUtLjAyMy40LjEyMS45MjMuMTIxLjkyM3MtLjguMTA0LTEuMjM0LjAzNGMtLjM5LS4wNjItLjg3NS0uODQtMS0xLjA3OC0uMTcyLS4zMjgtLjUzOS0uMjY1LS42ODItLjAyMy0uMjI0LjM4My0uNzA5IDEuMDctMS4wNSAxLjExMy0uNjY5LjA4NC0yLjA1NS4wMy0zLjE0LjAyIDAgMCAuMTg1LTEuMDEtLjIyNy0xLjM1OC0uMzA1LS4yNi0uODMtLjc4NC0xLjE0NC0xLjA2bC0uODMyLS45MmMtLjI4My0uMzYtMS4wMDItLjkzLTEuMjQzLTEuOTg2LS4yMTMtLjkzNi0uMTkyLTEuMzk1LjAzNy0xLjc3LjIzMi0uMzguNjctLjU4OS44NTQtLjYyNS4yMDgtLjA0Mi42OTItLjAzOS44NzUuMDYyLjIyMy4xMjMuMzEzLjE2LjQ4OC4zOTEuMjMuMzA3LjMxMi40NTYuMjEzLjEyMS0uMDc2LS4yNjItLjMyMi0uNTk1LS40MzQtLjk3LS4xMDktLjM2LS40LS45NDMtLjM4LTEuNTI2LjAwOC0uMjIuMTAzLS43Ny44MzItMS4wNDJ6Ii8+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBkPSJNMjAuNTY2IDE5LjczNHYtMy40NTlNMTguNTUgMTkuNzQ2bC0uMDE1LTMuNDczTTE2LjU1NSAxNi4zMDVsLjAyIDMuNDI2Ii8+PC9nPjwvZz48L3N2Zz4K";
	var cursorIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCSB2aWV3Qm94PSIwIDAgMjggMjgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI4IDI4IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9IjguMiwyMC45IDguMiw0LjkgMTkuOCwxNi41IDEzLDE2LjUgMTIuNiwxNi42ICIvPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iMTcuMywyMS42IDEzLjcsMjMuMSA5LDEyIDEyLjcsMTAuNSAiLz48cmVjdCB4PSIxMi41IiB5PSIxMy42IiB0cmFuc2Zvcm09Im1hdHJpeCgwLjkyMjEgLTAuMzg3MSAwLjM4NzEgMC45MjIxIC01Ljc2MDUgNi41OTA5KSIgd2lkdGg9IjIiIGhlaWdodD0iOCIvPjxwb2x5Z29uIHBvaW50cz0iOS4yLDcuMyA5LjIsMTguNSAxMi4yLDE1LjYgMTIuNiwxNS41IDE3LjQsMTUuNSAiLz48L3N2Zz4=";

	/**
	 * Mus constructor that defines initial variables and
	 * sets browser width and height.
	 * @knownbug: if user decides to change browser window size on-the-go
	 * 		it may cause bugs during playback
	 */
	function Mus(settings) {
		if (this === undefined) {
			console.error('Have you initialized Mus with "new" statement? (i.e. var mus = new Mus())');
			return;
		}
		const defaults = {
			target: window,
			onupdate: undefined
		}
		this.options = Object.assign({}, defaults, settings);

		this.target = this.options.target;
		this.frames = [];
		this.timeouts = [];
		this.pos = 0;
		this.duration = 0;
		this.startedAt = 0;
		this.finishedAt = 0;
		this.recording = false;
		this.playing = false;
		this.window = {
			width: this.target.outerWidth,
			height: this.target.outerHeight
		};

		this._currPos = 0;

		Object.defineProperty(this,'currPos', { // get/set current frame based on its index
			enumerable: true,
			get: function () {
				return this._currPos;
			},
			set: function(index) {
				this._currPos = index;
				if (this.options.onupdate) this.options.onupdate(this);
			}
		});

		Object.defineProperty(this,'ms', { // get/set current frame based on its timestamp (ms)
			enumerable: true,
			get: function (foo) {
				return this.frames.length ? this.frames[this.currPos][3] : 0;
			},
			set: function(ms) {
				if (!this.frames.length) return;
				this.currPos = this.frames.findIndex(value => value[3] > ~~ms);
			}
		});

		// Stores initial listeners
		this.onmousemove = this.target.onmousemove;
		this.onmousedown = this.target.onmousedown;
		this.onmouseup = this.target.onmouseup;
		this.onscroll = this.target.onscroll;

	};

	/**
	 * Here goes all Mus magic
	 */
	Mus.prototype = {

		/**
		 * Listener intended to be used with onmousemove (including move-whilst-clicked)
		 * @param callback function a callback fnc
		 * @return function the mouse move listener
		 */
		moveListener: function (callback) {
			return function (e) {
				if (callback) callback([e.buttons ? 'd' : 'm', e.clientX, e.clientY]);
			}
		},
		upListener: function (callback) {
			return function (e) {
				if (callback) callback(['u', e.clientX, e.clientY]);
			}
		},

		/**
		 * Listener intended to be used with onmousedown
		 * @param callback function a callback fnc
		 * @return function the mouse click listener
		 */
		clickListener: function (callback) {
			var self = this;
			return function (e) {
				// record the scroll position AND the click so scrolling during playback doesn't drift
				if (callback) callback(['s', self.target.document.scrollingElement.scrollLeft, self.target.document.scrollingElement.scrollTop]);
				if (callback) callback(['c', e.clientX, e.clientY]);
			}
		},

		/**
		 * Listener intended to be used with onscroll
		 * @param callback function a callback fnc
		 * @return function the window scroll listener
		 */
		scrollListener: function (callback) {
			var self = this;
			return function (e) {
				if (callback) callback(['s', self.target.document.scrollingElement.scrollLeft, self.target.document.scrollingElement.scrollTop]);
			}
		},

		/** Mus recording tools **/

		/**
		 * Starts screen recording
		 */
		record: function (onFrame) {
			if (this.recording) return;

			var self = this;
			if (self.startedAt == 0) self.startedAt = new Date().getTime() / 1000;

			self.frames.push(['s', self.target.document.scrollingElement.scrollLeft, self.target.document.scrollingElement.scrollTop, 0]);

			// Defines Mus listeners on window
			this.target.onmousemove = this.moveListener(function (pos) {
				self.frames.push(pos.concat(new Date().getTime() - (self.startedAt * 1000)));
				if (onFrame instanceof Function) onFrame();
			});
			this.target.onmousedown = this.clickListener(function (click) {
				self.frames.push(click.concat(new Date().getTime() - (self.startedAt * 1000)));
				if (onFrame instanceof Function) onFrame();
			});
			this.target.onmouseup = this.upListener(function (up) {
				self.frames.push(up.concat(new Date().getTime() - (self.startedAt * 1000)));
				if (onFrame instanceof Function) onFrame();
			});
			this.target.onscroll = this.scrollListener(function (scroll) {
				self.frames.push(scroll.concat(new Date().getTime() - (self.startedAt * 1000)));
				if (onFrame instanceof Function) onFrame();
			});

			// Sets our recording flag
			self.recording = true;
		},

		/**
		 * Stops screen recording
		 */
		stop: function (after) {
			this.finishedAt = new Date().getTime() / 1000;
			this.target.onmousemove = this.onmousemove;
			this.target.onmousedown = this.onmousedown;
			this.target.onscroll = this.onscroll;

			// Sets our recording flag
			this.timeouts = [];
			this.recording = false;
			this.playing = false;
			this.pos = 0;
			this.duration = (this.frames.length) ? this.frames[this.frames.length - 1][3] : -1;

			if (after instanceof Function) after();
		},

		/**
		 * Pauses current execution
		 */
		pause: function () {
			if (this.playing) {
				this.pos = this.currPos;
				this.playing = false;
				this.clearTimeouts();
			}
		},

		/**
		 * each frame is a timeout to execute a cue point
		 * you can specify a time in ms to start from
		 */
		cue: function (ms, onfinish) {
			const self = this;
			self.destroyClickSnapshot();
			self.playing = false;
			self.clearTimeouts();
			self.ms = ms;

			self.pos = self.currPos;
			let base = self.frames[self.pos][3];
			let copy = self.frames.map((value) => { // a COPY of the frames with start-time adjusted
				return [
					value[0], value[1], value[2], Math.max(0, value[3]-base)
				];
			});

			self.createCursor(self.target.document);
			var node = self.target.document.getElementById("musCursor");

			for (; self.pos < copy.length; self.pos++) {
				let delay = copy[self.pos][copy[self.pos].length - 1];
				self.timeouts.push(setTimeout(function (pos) {

					// Plays specific timeout
					self.playFrame(self, copy[pos], node);
					self.currPos = pos;

					if (pos == copy.length - 1) {
						node.style.backgroundColor = "transparent";
						self.timeouts = [];
						self.playing = false;
						self.pos = 0;
						if (onfinish) onfinish();
					}
				}, delay, self.pos));
			};
			this.playing = true;
		},



		/**
		 * Runs a playback of a recording
		 * @param function onfinish a callback function
		 */
		play: function (onfinish) {
			if (this.playing) return;
			this.cue(0,onfinish);
		},

		/**
		 * Releases Mus instance
		 */
		release: function () {
			this.frames = [];
			this.startedAt = 0;
			this.finishedAt = 0;
			this.stop();
			this.destroyCursor(this.target.document);
			this.destroyClickSnapshot(this.target.document);
		},

		/** Mus internal functions **/

		/**
		 * Play a specific frame from playback
		 */
		playFrame: function (self, frame, node) {

			if (frame[0] == 'm') {
				node.style.left = self.getXCoordinate(frame[1]) + "px";
				node.style.top = self.getYCoordinate(frame[2]) + "px";

			} else if (frame[0] == 'd') {
				node.style.left = self.getXCoordinate(frame[1]) + "px";
				node.style.top = self.getYCoordinate(frame[2]) + "px";
				node.style.backgroundImage = "url(" + cursorDown + ")";

			} else if (frame[0] == 'u') {
				node.style.left = self.getXCoordinate(frame[1]) + "px";
				node.style.top = self.getYCoordinate(frame[2]) + "px";
				node.style.backgroundImage = "url(" + cursorIcon + ")";

			} else if (frame[0] == 'c') {
				self.createClickSnapshot(frame[2], frame[1], self.target.document);

			} else if (frame[0] == 's') {
				self.target.scrollTo(frame[1], frame[2]);

			}
		},

		/**
		 * Clears all timeouts stored
		 */
		clearTimeouts: function () {
			for (var i in this.timeouts) {
				clearTimeout(this.timeouts[i]);
			}

			this.timeouts = [];
		},

		/**
		 * Calculates time elapsed during recording
		 * @param as_ms true = return as milliseconds
		 * @return integer time elapsed
		 */
		timeElapsed: function (as_ms) {
			let mult = as_ms ? 1000 : 1;
			return (this.finishedAt - this.startedAt) * mult;
		},

		/**
		 * Creates Mus cursor if non-existent
		 */
		createCursor: function (doc) {
			if (!doc.getElementById("musCursor")) {
				var node = doc.createElement("div");
				node.id = "musCursor";
				node.style.position = "fixed";
				node.style.width = "32px";
				node.style.height = "32px";
				node.style.top = "-100%";
				node.style.left = "-100%";
				node.style.borderRadius = "32px";
				node.style.backgroundImage = "url(" + cursorIcon + ")";
				doc.body.appendChild(node);
			}
		},

		/**
		 * Destroys Mus cursor
		 */
		destroyCursor: function (doc) {
			var cursor = doc.getElementById("musCursor");
			if (cursor) cursor.remove();
		},

		/**
		 * Creates Mus click snapshot
		 */
		createClickSnapshot: function (x, y, doc) {
			var left = doc.scrollingElement.scrollLeft;
			var top = doc.scrollingElement.scrollTop;
			var node = doc.createElement("div");
			node.className = "musClickSnapshot";
			node.style.position = "absolute";
			node.style.width = "32px";
			node.style.height = "32px";
			node.style.top = (x + top) + "px";
			node.style.left = (y + left) + "px";
			node.style.borderRadius = "32px";
			node.style.backgroundColor = "orangered";
			node.style.opacity = 0.1;
			doc.body.appendChild(node);
		},

		/**
		 * Destroys Mus click snapshot
		 */
		destroyClickSnapshot: function () {
			var nodes = this.target.document.getElementsByClassName("musClickSnapshot");
			while (nodes.length > 0) {
				nodes[0].parentNode.removeChild(nodes[0]);
			}
		},

		/**
		 * Calculates current X coordinate of mouse based on window dimensions provided
		 * @param x integer the x position
		 * @return integer calculated x position
		 */
		getXCoordinate: function (x) {
			if (this.target.outerWidth > this.window.width) {
				return parseInt(this.window.width * x / this.target.outerWidth);
			}

			return parseInt(this.target.outerWidth * x / this.window.width);
		},

		/**
		 * Calculates current Y coordinate of mouse based on window dimensions provided
		 * @param y integer the y position
		 * @return integer calculated y position
		 */
		getYCoordinate: function (y) {
			if (this.target.outerHeight > this.window.height) {
				return parseInt(this.window.height * y / this.target.outerHeight);
			}

			return parseInt(this.target.outerHeight * y / this.window.height);
		},

		/** Public getters and setters **/

		/**
		 * Get all generated Mus data
		 * @return array generated Mus data
		 */
		getData: function () {
			return {
				frames: this.frames,
				timeElapsed: this.timeElapsed(),
				window: {
					width: this.target.outerWidth,
					height: this.target.outerHeight
				}
			};
		},

		/**
		 * Sets generated Mus data for playback
		 * @param data array generated Mus data
		 */
		setData: function (data) {
			if (data.frames) this.frames = data.frames;
			if (data.window) this.window = data.window;
		},

		/**
		 * Sets recorded frames for playback
		 * @param frames array the frames array
		 */
		setFrames: function (frames) {
			this.frames = frames;
		},

		/**
		 * Sets custom window size for playback
		 * @param width integer window width
		 * @param height integer window height
		 */
		setWindowSize: function (width, height) {
			this.window.width = width;
			this.window.height = height;
		},

		/**
		 * Informs if Mus is currently recording
		 * @return boolean is recording?
		 */
		isRecording: function () {
			return this.recording;
		},

		/**
		 * Informs if Mus is currently playing
		 * @return boolean is playing?
		 */
		isPlaying: function () {
			return this.playing;
		},

	};

	return Mus;

})));