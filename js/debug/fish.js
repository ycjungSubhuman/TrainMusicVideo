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
	
	var light = new THREE.PointLight( 0xffffff, 1, 100 );
	light.position.set( 0, 0, 2 );
	scene.add( light );
	
	var fish1 = undefined;


	var loader = new THREE.TextureLoader();
	loader.load('textures/test.png', function(tex) {
		var geo_plane = new THREE.PlaneGeometry(3, 3, 10, 10);
		var mat = new THREE.MeshBasicMaterial(0xffffff);
		mat.map = tex;
		var plane = new THREE.Mesh(geo_plane, mat);
		plane.position.y = -0.3;
		plane.position.z = -1.0;
		plane.rotation.z = -Math.PI/2;
		scene.add (plane);
	});

	
	var objLoader = new THREE.OBJLoader ();
	objLoader.load('obj/GOLDFISH.obj', function (object) {
		fish1 = object;
		fish1.position.x = 0;
		fish1.rotation.y = Math.PI * 0.5;
		scene.add (fish1);
	});
	camera.position.z = 0.7;
	
	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );
	
	fishEye = new FishEyePass( camera, 0.3 );
	fishEye.renderToScreen = true;
	composer.addPass( fishEye );
	
	var doh = 0;
	
	function render() {
		requestAnimationFrame(render);
		doh += 0.015;
		if (fish1 !== undefined) {
			fish1.position.x = 0.2 * Math.sin(doh);
			fish1.position.z = 0.2 * Math.cos(doh);
			fish1.rotation.y = Math.PI / 2.0 + doh;
			camera.position.z = 1.2 + 0.2 * Math.sin(doh * 5.0);

			var distance = camera.position.length();
			fishEye.material.uniforms[ "distance" ].value = distance;
			fishEye.material.uniforms[ "aspect" ].value = camera.aspect;
		}
		composer.render( scene, camera );
	}
	render();
};