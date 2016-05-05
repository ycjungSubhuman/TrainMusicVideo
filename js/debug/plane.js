window.onload = function() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, 
		window.innerWidth / window.innerHeight,
		0.1, 40);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	window.onresize = function() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix ();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	document.body.appendChild( renderer.domElement );

	var geo_plane = new THREE.PlaneGeometry(100, 200, 100, 200);
	geo_plane.rotateX(Math.PI/2);
	var material = new THREE.ShaderMaterial({
		vertexShader: loadShaderFromId('vertexShader'),
		fragmentShader: loadShaderFromId('fragmentShader'),
	});

	var plane = new THREE.Mesh( geo_plane, material );
	scene.add( plane );

	camera.position.y = 3;
	camera.lookAt(new THREE.Vector3(40,0,0));

	function render() {
		requestAnimationFrame(render);
		renderer.render( scene, camera );
		plane.position.x = camera.position.x;
		plane.position.z = camera.position.z;
		camera.position.x += 0.1;
	}
	render();
};

