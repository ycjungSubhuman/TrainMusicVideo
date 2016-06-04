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
		},
		getFreqData: function () {
			this.analyser.getByteFrequencyData(this.frequencyData);
			return this.frequencyData;
		}
	}
	Analyser.init();
}) (this);