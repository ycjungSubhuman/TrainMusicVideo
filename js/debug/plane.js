window.onload = function() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 120 );
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
	var geo_cube = new THREE.CubeGeometry(10, 10, 10);
	scene.fog = new THREE.FogExp2(0x000000, 0.1);

	geo_plane.rotateX(-Math.PI/2);

	var uniforms = {
		time: {type: "f", value: 0},
		//moonPhase: {type: "i", value: 0}
	};

	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: Shaders.plane_vertex_default,
		fragmentShader: Shaders.plane_fragment_default,
		wireframe: true,
	});
	var isplane = false;
	var plane1 = new THREE.Mesh( geo_plane, material );
	var plane2 = new THREE.Mesh( geo_plane, material );
	var cube = new THREE.Mesh( geo_cube, material );
	scene.add( plane1 );
	scene.add( plane2 );
	scene.add( cube );

	plane1.position.x = 1000;
	plane2.position.x = 3000;
	
	cube.position.x = 40;
	cube.position.z = 30;
	cube.position.y = 5;

	camera.position.y = 1.0;
	camera.lookAt(new THREE.Vector3(20,0,0));
	
	var camrespos = Math.floor(camera.position.x) % 4000;

	function render() {
		requestAnimationFrame(render);
		renderer.render( scene, camera );
		camera.position.x += 100;
		cube.position.x += 0.2;
		uniforms.time.value += 0.1;
		camrespos = Math.floor(camera.position.x) % 4000;
		if((camrespos >= 2000) && (!isplane))
		{
			plane1.position.x = plane2.position.x+2000.0;
			isplane = true;
		}
		else if((camrespos < 2000) && isplane)
		{
			plane2.position.x = plane1.position.x+2000.0;
			isplane = false;
		}
		//uniforms.moonPhase += 1;
	}
	render();
};
