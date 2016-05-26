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

	//create cube geometry
	var geo_cube = new THREE.CubeGeometry(1, 1, 1);

	//uniform variables for cubes_fragment_default
	var uniforms = {
		time: {type: "f", value: 0},
	};
	//material for the flashing cube
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: Shaders.cubes_vertex_default,
		fragmentShader: Shaders.cubes_fragment_default,
	});
	//light source and meterial for phong shaded cube
	var light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 5, 5, 5 );
	scene.add( light );
	var material2 = new THREE.MeshPhongMaterial();

	//vertex drawing
	var loader = new THREE.TextureLoader();
	var texture = loader.load( 'textures/circle.png' );

	//custome points meterial
	var material3 = new THREE.ShaderMaterial({
		uniforms: {
			map: {
				value: texture,
			}
		},
		vertexShader: Shaders.cubes_point_vertex_default,
		fragmentShader: Shaders.cubes_point_frag_default,
		depthTest:      true,
		depthWrite:     false,
		transparent:    true
	});

	//points material
	var material4 = new THREE.PointsMaterial({
		color: 0xffffff,
		map: texture,
		transparent: true,
		opacity: 1,
		alphaTest: 0.5,
		sizeAttenuation: true,
		depthTest: true,
		depthWrite: false,
	});

	var cube = new THREE.Mesh( geo_cube, material );
	var cube2 = new THREE.Mesh( geo_cube, material2 );
	var cube3 = new THREE.Points( geo_cube, material4 );
	cube3.sortParticles = true;
	cube2.position.x = 3;
	cube3.position.y = 3;
	scene.add( cube );
	cube.add ( cube2 );
	cube2.add ( cube3 );
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