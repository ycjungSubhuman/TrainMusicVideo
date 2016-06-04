(function (scope) {
	scope.Analyser = {
		init: function () {
			//get audio analyser
			var ctx_audio = new AudioContext ();
			var audio = document.getElementById('audio');
			var audioSrc = ctx_audio.createMediaElementSource(audio);
			this.analyser = ctx_audio.createAnalyser();

			audioSrc.connect (this.analyser);
			this.analyser.connect (ctx_audio.destination);
			this.frequencyData = new Uint8Array (this.analyser.frequencyBinCount);

			//event binding
			var self = this;
			Loop.loop(function () { self.update (self);});
		},
		update: function (self) {
			self.analyser.getByteFrequencyData(self.frequencyData);
		},
		getFreq: function () {
			return this.frequencyData();
		}
	}
	Analyser.init();
}) (this);