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

	var geo_cube = new THREE.CubeGeometry(1, 1, 1);

	var uniforms = {
		time: {type: "f", value: 0},
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: Shaders.cubes_vertex_default,
		fragmentShader: Shaders.cubes_fragment_default,
	});
	var light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 5, 5, 5 );
	scene.add( light );

	var material2 = new THREE.MeshPhongMaterial();

	var cube = new THREE.Mesh( geo_cube, material );
	var cube2 = new THREE.Mesh( geo_cube, material2 );
	cube2.position.x = 3;
	scene.add( cube );
	cube.add ( cube2 );
	camera.position.z = 10;

	function render() {
		requestAnimationFrame(render);
		renderer.render( scene, camera );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.03;
		uniforms.time.value += 0.1;
	}
	render();
};