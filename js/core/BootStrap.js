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
			if (note.track == 2) {
				//Basedrum
				SWriter.addCallBack(note.time_start, function() {
					ActionManager.emitEvent("boom");
				});
			}
			else if (note.track == 3) {
				//Seekchic maracas
				SWriter.addCallBack(note.time_start, function() {
					Renderer.hue = 0xaa;
					TweenLite.to(Renderer, 0.4, {hue: 0x00 });
				});
			}
			else if (note.track == 4) {
				//bass pluck
				SWriter.addCallBack(note.time_start, function () {
					ActionManager.emitEvent("pluck");
				});
			}
			else if (note.track == 5) { 
				//GoldFishScene
				var target = new THREE.Object3D ();
				var action = new DoubleGoldfishAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new GoldfishShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 6) {
				//Car intro Scene
				var target = new THREE.Object3D ();
				var action = new CarIntroAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new CarIntroShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 7) {
				//vocal note events in StreetScene
			}
			else if (note.track == 8) {
				//Street riding Scene
				var target = new THREE.Object3D ();
				var action = new CarSceneAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new CarSceneShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 9) {
				//Dots Flicker Scene
				var target = new THREE.Object3D ();
				var action = new DotsAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new SmoothSweepShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 10) { //10
				//Gold Fish 2 : Gold fish stabbed by needles
				var target = new THREE.Object3D ();
				var action = new FishNeedleAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new FishNeedleShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 11) {
				//Street riding scene 2
				var target = new THREE.Object3D ();
				var action = new CarSceneAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new CarSceneShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 12) {
				//Dots Flicker 2
				var target = new THREE.Object3D ();
				var action = new DotsAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new PulsatingMoonShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 13) {
				//Deer Scene
			}
			else if (note.track == 14) {
				//Deer Dead Scene
				var target = new THREE.Object3D ();
				var action = new DeerAction (target, note.time_start, note.time_end, note.track);
				var cam = new DeerShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
			else if (note.track == 15) {
				//Fish alive
			}
			else if (note.track == 16) {
				//Fish Dead
			}
			else if (note.track == 17) {
				//Street Scene
			}
			else if (note.track == 18) {
				//Dots Scene final
				var target = new THREE.Object3D ();
				var action = new DotsAction (target, note.time_start, note.time_end, note.track); //do nothing
				var cam = new PulsatingMoonShot (target, note.time_start, note.time_end, note.track);
				SWriter.addHead(action);
				SWriter.addHead(cam);
			}
		});
	}

	scope.Bootstrap = {
		init: function () {
			console.log('bootstrap init');
			AssetManager.init ();
			Player.init ();
			THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
			var list_promises = _.map(Project.assetfiles, AssetManager.load);
			list_promises = list_promises.concat(_.map(Project.modelfiles, AssetManager.loadmodel));

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
