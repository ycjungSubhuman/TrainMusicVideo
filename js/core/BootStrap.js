//after Stage.js, Player.js, Project.js Asset.js
;(function (scope) {
	var initTimeline = function() {
		//init timeline according to midi file
		var midifile = Asset(Project.midi);
		var events = midifile.getMidiEvents ();
		//midi playtime is in milliseconds

		var notes = [];
		//get all the notes
		_.each (events, function (event) {
			// 9 is note on
			// 8 is note off
			// use object.delta for duration 
			// check track
			if (event.track == 0) { //track 0 : bassdrum
				if (event.subtype == 9) { //note on
					Player.timeline.add(function () {
						//TODO: implement timeline adding for track 0 event
						console.log("boom");
					}, event.playTime / 1000);
				}
			}
			if (event.track == 1) {
				if (event.subtype == 9) {
					Player.timeline.add(function () {
						//TODO: implement timeline adding for track 1 event
						console.log("tshack");
					}, event.playTime / 1000);
				}
			}
			//and so on...
		});
	}

	scope.Bootstrap = {
		init: function () {
			console.log('bootstrap init');
			AssetManager.init ();
			Player.init ();
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
