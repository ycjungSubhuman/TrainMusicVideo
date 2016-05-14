//after Stage.js, Player.js, Project.js Asset.js
;(function (scope) {
	var initTimeline = function() {
		//init timeline according to midi file
		var midifile = Asset(Project.midi);
		//TODO: implement timeline init
	}

	scope.Bootstrap = {
		init: function () {
			console.log('bootstrap init');
			AssetManager.init();
			var list_promises = _.map(Project.assetfiles, AssetManager.load);

			Promise.all(list_promises)
			.then (function (vals) {
				//init timeline. change screen. 
				initTimeline ();
				Bootstrap.emit("done");
			});
		},
		done: function () {
			//bootstrap done
			console.log ("bootstrap done");
			Stage.emit("init");
		}
	};
	Emitter(Bootstrap);
	Bootstrap.on("init", Bootstrap.init);
	Bootstrap.on("done", Bootstrap.done);
}) (this);
