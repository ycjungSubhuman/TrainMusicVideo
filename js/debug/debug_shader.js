window.onload = function() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 40 );
	var renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
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
		vertexShader: Shaders.vd,
		fragmentShader: Shaders.fd,
	});

	var cube = new THREE.Mesh( geo_cube, material );
	var material2 = new THREE.MeshBasicMaterial( 0xffffff );
	var cube2 = new THREE.Mesh( geo_cube, material2 );
	scene.add( cube );
	cube.add( cube2 );
	camera.position.z = 5;
	cube2.position.x = 4;
	//light source and meterial for phong shaded cube
	var light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 5, 5, 5 );
	scene.add( light );

	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );
	
	bokeh = new THREE.BokehPass( scene, camera, 
	{
		focus : 1.1,
		aspect : undefined,
		aperture : undefined,
		maxblur : undefined
	});
	bokeh.renderToScreen = true;
	composer.addPass( bokeh );
	
	function render() {
		requestAnimationFrame(render);
		composer.render( scene, camera );
		cube.rotation.x += 0.001;
		cube.rotation.y += 0.003;
		uniforms.time.value += 0.1;
	}
	render();
};