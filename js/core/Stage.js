( function (scope) {
	scope.Stage = {
		init: function () {
			console.log('stage init');
			//init Scene
			TweenLite.defaultEase = Quad.easeIn;

			//remove loading text
			var text = document.getElementsByTagName('h4')[0];
			TweenLite.to(text.style, 1, {left: "2000px", onComplete: function (){
				text.remove();
			} });

			//remove rotating cube
			var cube = Scene.getObjectByName("cube_load").position;
			TweenLite.to(cube, 1, {z:"20", onComplete: function () {
				Scene.remove(cube);
				Project.loaded = true;
				Renderer.emit("start");
			} });

			//touch pause start
			window.onclick = function () {
				if (Player.isPlaying === true)
					Player.emit("pause");
				else
					Player.emit("play");
			};
			window.addEventListener("touchstart", function () {
				if (Player.isPlaying === true)
					Player.emit("pause");
				else
					Player.emit("play");
			});
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