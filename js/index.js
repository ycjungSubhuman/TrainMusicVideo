window.onresize = function () {
	Camera.emit("resize");
	Renderer.emit("resize");
	console.log('resized');
}

window.onload = function() {

	document.body.appendChild( Renderer.domElement );

	var geometry = new THREE.CubeGeometry( 1, 1, 1 );

	var uniforms = {
		time: {type: "f", value: 0},
	};

	var material = new THREE.MeshBasicMaterial();

	var cube = new THREE.Mesh( geometry, material );
	cube.name = "cube_load";
	cube.position.x = -2;
	Scene.add( cube );


	Camera.position.y = 12.0;
	Camera.position.z = -4.0;
	Camera.direction = new THREE.Vector3(0, -1, 0);
	Camera.lookAt(new THREE.Vector3(0,-1,0));

	function render() {
		if (Project.loaded) {
			return;
		}
		requestAnimationFrame(render);
		Renderer.render( Scene, Camera );

		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;
		uniforms.time.value += 0.1;
	}
	render();
	var loading = document.createElement("h4");
	var text = document.createTextNode("Loading...");
	loading.appendChild(text);
	loading.style.position = 'absolute';
	loading.style.color = 'white';
	loading.style.top = (window.innerHeight/2-90).toString()+'px';
	loading.style.left = (window.innerWidth/2-100).toString()+'px';
	document.body.appendChild(loading);

	//init bootstrap and start loading files
	Bootstrap.emit('init');
}