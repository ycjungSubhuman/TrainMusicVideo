(function (scope) {
	scope.FishOutAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			this.fish1 = Asset('goldfish').clone();
            this.fish2 = Asset('goldfish').clone();
            this.fish1.scale.set(20, 20, 20);
            this.fish2.scale.set(20, 20, 20);
            this.fish1.rotation.z = Math.PI / 2.0;
            this.fish2.rotation.z = Math.PI / 2.0;
            this.target.add( new THREE.AmbientLight(0xffffff));
			this.target.add(this.fish1);
			this.on("boom", this.boom);
			super.start ();
            
            // Motion variables
            this.step = 0;
            this.theta = 0.0;

            var self = this;

            var loader = new THREE.TextureLoader();
	        loader.load('textures/wallpaper.png', function(tex) {
        		var geo_plane = new THREE.PlaneGeometry(3, 3, 10, 10);
        		var mat = new THREE.MeshBasicMaterial(0xffffff);
        		mat.map = tex;
        		var plane = new THREE.Mesh(geo_plane, mat);
        		plane.position.x = -1.0;
        		plane.rotation.x = Math.PI/2;
        		self.target.add (plane);
	        });

            this.composer = new THREE.EffectComposer( Renderer );
        	this.composer.addPass( new THREE.RenderPass( Scene, Camera ) );
	
    	    this.fishEye = new FishEyePass( Camera, 0.3 );
	        this.fishEye.renderToScreen = true;
    	    this.composer.addPass( this.fishEye );
            
            this.composedCallback = function () {
                var distance = Camera.position.length();
                self.fishEye.material.uniforms[ "distance" ].value = distance;
			    self.fishEye.material.uniforms[ "aspect" ].value = Camera.aspect;
                self.composer.render( Scene, Camera );
            }
            Loop.stop(Renderer.callback);
            Loop.loop(this.composedCallback);
		}
		boom () {
            this.step = (this.step + 1) % 6;
            this.theta = 0.0;

			this.target.scale.set(1, 1, 1);
			TweenLite.to(this.target.scale, 0.5, {
				x: 0.8,
				y: 0.8,
				z: 0.8,
				ease: Power4.easeOut,
			});
		}
		update (self) {
			//TODO: implement popappear update
            var c = 0;
            var r = 0;

            self.theta += (Math.PI - self.theta) / 5.0;

            switch (self.step) {
            case 0:
            case 5:
                c = 0.5;
                r = 1.5;
                break;
            case 1:
            case 4:
                c = 0;
                r = 1.0;
                break;
            case 2:
            case 3:
                c = -0.5;
                r = 1.5;
                break;
            }
            
            self.fish1.position.z = -4.5 + r * Math.sin(self.theta + (self.step % 2) * Math.PI);
            self.fish1.position.y = c + r * Math.cos(self.theta + (self.step % 2) * Math.PI);
            self.fish2.position.z = -9.0 - self.fish1.position.z;
            self.fish2.position.y = -self.fish1.position.y;

            self.fish1.rotation.x = self.theta + (self.step % 2) * Math.PI;
            self.fish2.rotation.x = Math.PI - self.theta - (self.step % 2) * Math.PI;

            self.fishEye.material.uniforms[ "aspect" ].value = Camera.aspect;

			super.update(self);
		}
		end () {
            Loop.stop(this.composedCallback);
            Loop.loop(Renderer.callback);

			super.end ();
		}
	}
}) (this);