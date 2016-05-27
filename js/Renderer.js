( function (scope) {
	scope.Renderer = new THREE.WebGLRenderer();
	Renderer.setSize( window.innerWidth, window.innerHeight );
	Renderer.setClearColor( 0x111111, 1 );
	Renderer.hue = 0x11;
	Renderer.callback = function () {
		Renderer.setClearColor( Renderer.hue | Renderer.hue << 8 | Renderer.hue << 16, 1 );
		Renderer.render( Scene, Camera );
	};
	
	Emitter(scope.Renderer);
	Renderer.on("resize", function () {
		Renderer.setSize( window.innerWidth, window.innerHeight );
	});
	Renderer.on("start", function () {
		Loop.loop(Renderer.callback);
	});
	Renderer.on("stop", function () {
		Loop.stop(Renderer.callback);
	});
}) (this);