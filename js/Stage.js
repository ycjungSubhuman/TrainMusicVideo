( function (scope) {
	scope.Stage = {
		init: function () {
			console.log('stage init');
			//init Scene

			//remove loading text
			document.getElementsByTagName('h2')[0].remove();
			//remove rotating cube
			Scene.remove(Scene.getObjectByName('cube_load'));

			Stage.emit("done");
		},
		done: function () {
			console.log('stage done');
			//give control

		}
	};
	Emitter(Stage);
	Stage.on("init", Stage.init);
	Stage.on("done", Stage.done);
}) (this);