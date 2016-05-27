( function (scope) {
	scope.Camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 40 );
	Emitter(scope.Camera);
	Camera.on("resize", function() {
		Camera.aspect = window.innerWidth / window.innerHeight;
		Camera.updateProjectionMatrix ();
	});
}) (this);