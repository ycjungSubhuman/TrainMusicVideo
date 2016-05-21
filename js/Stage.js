( function (scope) {
	scope.Stage = {
		init: function () {
			console.log('stage init');
			//init Scene
			TweenLite.defaultEase = Quad.easeIn;

			//remove loading text
			var text = document.getElementsByTagName('h2')[0];
			text.textContent = "Complete";
			TweenLite.to(text, 1, {x: "2000px", opacity: "0.0", onComplete: function (){
				text.remove();
			} });

			//remove rotating cube
			var cube = Scene.getObjectByName("cube_load").position;
			TweenLite.to(cube, 1, {z:"10", onComplete: function () {
				Scene.remove(cube);
			} });

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