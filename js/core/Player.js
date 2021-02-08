(function (scope) {
	scope.Player = {
		init: function () {
			this.timeline = new TimelineLite ();
			this.isPlaying = false;
			this.timeline.stop();
		},
		play: function () {
			if(!Analyser.isinit) {
				Analyser.init();
			}
			this.timeline.time(document.getElementById('audio').currentTime);
			document.getElementById('audio').play();
			this.timeline.play();
			this.isPlaying = true;
			ActionManager.emitEvent("restart");
		},
		pause: function () {
			this.timeline.time(document.getElementById('audio').currentTime);
			document.getElementById('audio').pause();
			this.timeline.pause();
			this.isPlaying = false;
			ActionManager.emitEvent("pause");
		},
		stop: function () {
			this.timeline.time(document.getElementById('audio').currentTime);
			document.getElementById('audio').stop();
			this.timeline.stop();
			this.isPlaying = false;
		},
	}

	Emitter(scope.Player);
	Player.on("play", Player.play);
	Player.on("pause", Player.pause);
	Player.on("stop", Player.stop);
}) (this);