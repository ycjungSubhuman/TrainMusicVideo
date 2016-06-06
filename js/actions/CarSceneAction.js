(function (scope) {
	scope.CarSceneAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
            var geo_plane = new THREE.PlaneGeometry(2000, 200, 200, 20);
            
			geo_plane.rotateX(-Math.PI/2);
			
			var aspalt = Asset('textures/aspalt.png');
			aspalt.repeat.set( 8, 8 );
			
            this.uniforms1 = {
        		time: {type: "f", value: 0},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: aspalt}
        	};
            
            var material1 = new THREE.ShaderMaterial({
		        uniforms: this.uniforms1,
		        vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
	        });
            
			this.isplane = false;
	        this.plane1 = new THREE.Mesh( geo_plane, material1 );
	        this.plane2 = new THREE.Mesh( geo_plane, material1 );
			
			geo_plane = new THREE.PlaneGeometry(13, 2, 1, 1);
			geo_plane.rotateX(-Math.PI/2);
			
			this.uniforms2 = {
        		time: {type: "f", value: 0},
				istextured: {type: "b", value: false},
				tex: {type: "t", value: aspalt}
        	};
			
			var material2 = new THREE.ShaderMaterial({
		        uniforms: this.uniforms2,
		        vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
	        });
			
			for(var i=0; i<100; i++)
			{
				var roadline1 = new THREE.Mesh( geo_plane, material2 );
				var roadline2 = new THREE.Mesh( geo_plane, material2 );
				roadline1.position.y = 0.1;
				roadline1.position.x = -990 + i*20;
				roadline2.position.y = 0.1;
				roadline2.position.x = -990 + i*20;
				this.plane1.add(roadline1);
				this.plane2.add(roadline2);
			}
			
            this.camrespos = Math.floor(Camera.position.x) % 4000;
			
			var tmp = new THREE.Object3D ();
			tmp.add(this.plane1);
			tmp.add(this.plane2);
			target.add (tmp);
		}
		start () {
			//TODO: popappear render init            
            this.plane1.position.x = 1000;
	        this.plane2.position.x = 3000;
			

			
			//this.on("boom", this.boom);
			super.start ();
		}
		boom () {
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
            self.uniforms1.time.value += 0.08;
			self.uniforms2.time.value += 0.08;
            self.camrespos = Math.floor(Camera.position.x) % 4000;
            if((self.camrespos >= 2000) && (!self.isplane))
            {
                self.plane1.position.x = self.plane2.position.x+2000.0;
                self.isplane = true;
            }
            else if((self.camrespos < 2000) && self.isplane)
            {
                self.plane2.position.x = self.plane1.position.x+2000.0;
                self.isplane = false;
            }
            super.update(self);
        }
		end () {
			super.end ();
		}
	}
}) (this);