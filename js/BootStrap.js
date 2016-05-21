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
			}).catch (function (error) {
				console.log(error.statusText);
			});
		},
		done: function () {
			//bootstrap done
			console.log ("bootstrap done");
			Stage.emit("init");
		}
	};
	Emitter(scope.Bootstrap);
	Bootstrap.on("init", scope.Bootstrap.init);
	Bootstrap.on("done", scope.Bootstrap.done);
}) (this);