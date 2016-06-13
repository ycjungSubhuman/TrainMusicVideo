FishEyePass = function ( camera ) {
	THREE.Pass.call( this );
    
	if ( FishEyeShader === undefined )
        console.error( "FishEyePass relies on FishEyeShader" );
    
	var fishEyeShader = FishEyeShader;
	var fishEyeUniforms = THREE.UniformsUtils.clone( fishEyeShader.uniforms );
    
	fishEyeUniforms[ "aspect" ].value = camera.aspect;
    
	this.material = new THREE.ShaderMaterial( {
		uniforms: fishEyeUniforms,
		vertexShader: fishEyeShader.vertexShader,
		fragmentShader: fishEyeShader.fragmentShader
	} );
    
	this.uniforms = fishEyeUniforms;
	
	this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
	this.scene  = new THREE.Scene();
    
	this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
	this.scene.add( this.quad );
};

FishEyePass.prototype = Object.assign( Object.create( THREE.Pass.prototype ), {

	constructor: FishEyePass,

	render: function ( renderer, writeBuffer, readBuffer, delta, maskActive ) {
        this.quad.material = this.material;
        
        this.uniforms[ "tColor" ].value = readBuffer.texture;
		
		if ( this.renderToScreen ) {
			renderer.render( this.scene, this.camera );
		} else {
			renderer.render( this.scene, this.camera, writeBuffer, this.clear );
		}
    }

} );
