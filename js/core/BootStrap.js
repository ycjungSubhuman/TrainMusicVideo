//after Stage.js, Player.js, Project.js Asset.js
;(function (scope) {
	var initTimeline = function() {
		//init timeline according to midi file
		var midifile = Asset(Project.midi);
		var events = midifile.getMidiEvents ();
		//midi playtime is in milliseconds

		var Note = class {
			constructor (params) {
				this.time_start = params.time_start;
				this.time_end = params.time_end;
				this.track = params.track;
			}
		};
		var notes = [];
		var createNewNote = function(event) {
			notes.push(new Note ({
				time_start: event.playTime / 1000,
				track: event.track,
			}));
		}
		var endNote = function(event) {
			for (var i=notes.length-1; i>=0; i--) {
				if(notes[i].track == event.track){
					notes[i].time_end = event.playTime / 1000;
					break;
				}
			}
		}
		//get all the notes
		_.each (events, function (event) {
			// 9 is note on
			// 8 is note off
			if (event.subtype == 9) { //note on
				//TODO: implement timeline adding for track 0 event
				createNewNote(event);
			}
			else if (event.subtype == 8) {
				endNote(event);
			}
		});
		//event timeline edit
		_.each (notes, function (note) {
			if (note.track == 2) { //boom
				SWriter.addCallBack(note.time_start, function() {
					ActionManager.emitEvent("boom");
				});
			}
			else if (note.track == 3) {
				SWriter.addCallBack(note.time_start, function() {
					Renderer.hue = 0xaa;
					TweenLite.to(Renderer, 0.4, {hue: 0x00 });
				});
			}
			else if (note.track == 4) {
				/*var geo_cube = new THREE.CubeGeometry ( 1, 1, 1 );
				var material = new THREE.MeshBasicMaterial ();
				var cube = new THREE.Mesh (geo_cube, material);
				var action = new Action (cube, note.time_start, note.time_end, note.track); //do nothing
				var cam = new PulsatingMoonShot (cube, note.time_start, note.time_end, note.track);
				SWriter.addHead(action, cam);*/
				var target = new THREE.Object3D ();
				var action = new DotsAction (target, note.time_start, note.time_end, note.track);
				var cam = new PulsatingMoonShot (target, note.time_start, note.time_end, note.track);
				
				SWriter.addHead(action, cam);
			}
			else if (note.track == 5) { 
				var target = new THREE.Object3D ();

				//var action = new PulsateAction (sphere, note.time_start, note.time_end, note.track); //do nothing
				//var cam = new MoonShot (sphere, note.time_start, note.time_end, note.track);
				
				//var action = new CarSceneAction (target, note.time_start, note.time_end, note.track); //do nothing
				//var cam = new CarSceneShot (target, note.time_start, note.time_end, note.track);
				var action = new CarSceneAction (target, note.time_start, 1000000, note.track); //do nothing
				var cam = new CarSceneShot (target, note.time_start, 1000000, note.track);
				SWriter.addHead(action, cam);
			}
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
