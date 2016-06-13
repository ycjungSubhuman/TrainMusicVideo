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
			var cube = Scene.getObjectByName("cube_load");
			TweenLite.to(cube.position, 1, {z:"20", onComplete: function () {
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
			document.delta_x = 0;
			document.delta_y = 0;
			document.tar_x = 0;
			document.tar_y = 0;

			//camera control
			document.addEventListener('mousemove', function (event) {
				document.tar_x = (event.clientX - window.innerWidth / 2) / window.innerWidth * 5;
				document.tar_y = ((-event.clientY) + window.innerHeight / 2) / window.innerHeight * 5;
			});
			Loop.loop(function () {
				document.delta_x = document.delta_x + (document.tar_x - document.delta_x) * 0.03;
				document.delta_y = document.delta_y + (document.tar_y - document.delta_y) * 0.03;
				var pos_cam = Camera.getWorldPosition();
				var dir_look = Camera.direction.normalize();
				var dir_y = (new THREE.Vector3 (0, 1, 0)).normalize();
				var dir_x = dir_look.clone().cross(dir_y);
				var dir_new = dir_look.clone().add(dir_x.clone().multiplyScalar(document.delta_x)).add(dir_y.clone().multiplyScalar(document.delta_y)).normalize();
				Camera.dir_eye = dir_new;
				Camera.dir_eye.x = -dir_new.x;
				Camera.lookAt(pos_cam.clone().add(Camera.dir_eye));
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