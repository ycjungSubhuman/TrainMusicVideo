window.onload = function() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 40 );
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 1 );

	window.onresize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix ();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	document.body.appendChild( renderer.domElement );

	var geo_plane = new THREE.PlaneGeometry(2000, 200, 200, 20);
	geo_plane.rotateX(-Math.PI/2);

	var uniforms = {
		time: {type: "f", value: 0},
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: Shaders.vertex_default,
		fragmentShader: Shaders.fragment_default,
		wireframe: true,
	});

	var plane = new THREE.Mesh( geo_plane, material );
	scene.add( plane );


	camera.position.y = 1.0;
	camera.lookAt(new THREE.Vector3(20,0,0));

	function render() {
		requestAnimationFrame(render);
		renderer.render( scene, camera );
		camera.position.x += 0.2;
		uniforms.time.value += 0.1;
	}
	render();
};
