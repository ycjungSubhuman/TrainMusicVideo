( function (scope) {
	scope.Renderer = new THREE.WebGLRenderer();
	Renderer.setSize( window.innerWidth, window.innerHeight );
	Renderer.setClearColor( 0x111111, 1 );
	
	Emitter(scope.Renderer);
	Renderer.on("resize", function () {
		Renderer.setSize( window.innerWidth, window.innerHeight );
	});

}) (this);