( function (scope) {
	scope.Camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 400 );
	scope.Camera.direction = new THREE.Vector3(0, 0, -1);
	scope.Camera.dir_eye = new THREE.Vector3(0, 0, -1);

	Emitter(scope.Camera);
	Camera.on("resize", function() {
		Camera.aspect = window.innerWidth / window.innerHeight;
		Camera.updateProjectionMatrix ();
	});
}) (this);