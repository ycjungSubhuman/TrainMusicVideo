(function (scope) {
	scope.CarSceneAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
            var geo_plane = new THREE.PlaneGeometry(2000, 600, 200, 20);
            
			geo_plane.rotateX(-Math.PI/2);
			geo_plane.rotateY(-Math.PI/2);
			
			var aspalt = Asset('textures/aspalt.png');
			aspalt.wrapS = aspalt.wrapT = THREE.RepeatWrapping;
			aspalt.repeat.set( 2, 20 );

			var bdtex = Asset('obj/building/lotteCastle.png');
			
            this.uniforms1 = {
        		time: {type: "f", value: document.time},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: aspalt},
				texrepeat: {type: "f", value: 20.0},
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
			
			geo_plane = new THREE.PlaneGeometry(3, 13, 1, 1);
			geo_plane.rotateX(-Math.PI/2);
			
			this.uniforms2 = {
        		time: {type: "f", value: document.time},
				istextured: {type: "b", value: false},
				tex: {type: "t", value: aspalt},
				texrepeat: {type: "f", value: 20.0},
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
				roadline1.position.y = 0.2;
				roadline1.position.z = -990 + i*20;
				roadline2.position.y = 0.1;
				roadline2.position.z = -990 + i*20;
				this.plane1.add(roadline1);
				this.plane2.add(roadline2);
			}

			this.uniforms3 = {
        		time: {type: "f", value: document.time},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: bdtex},
				texrepeat: {type: "f", value: 1},
        	};

			var material3 = new THREE.ShaderMaterial({
				uniforms: this.uniforms3,
				vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
			})

			for(var tmp=0; tmp<2; tmp++)
			{
				var buX = -400 + 800 * tmp;
				for(var i=0; i<50; i++)
				{
					var bu1 = Asset('building').clone();
					var bu2 = Asset('building').clone();
					bu1.children[0].material = material3;
					bu2.children[0].material = material3;
					bu1.rotateY(-Math.PI);
					bu2.rotateY(-Math.PI);
					var buY = ((Math.random() * 50.0) + 300.0) / 90.0;
					bu1.scale.copy(new THREE.Vector3(200.0 / 30.0, buY, 200.0 / 22.0));
					bu1.position.z = i*200 - 900;
					bu1.position.x = buX;
					bu1.position.y = buY;
					this.plane1.add(bu1);
					bu2.scale.copy(new THREE.Vector3(200.0 / 30.0, buY, 200.0 / 22.0));
					bu2.position.z = i*200 - 900;
					bu2.position.x = buX;
					bu2.position.y = buY;
					this.plane2.add(bu2);
				}
			}
			
            this.camrespos = Math.floor(Camera.position.z) % 4000;
			
			var tmp = new THREE.Object3D ();
			tmp.add(this.plane1);
			tmp.add(this.plane2);
			target.add (tmp);
		}
		start () {
			//TODO: popappear render init            
            this.plane1.position.z = 1000;
	        this.plane2.position.z = 3000;
			

			
			this.on("boom", this.boom);
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
			document.time += 0.08;
            self.uniforms1.time.value = document.time;
			self.uniforms2.time.value = document.time;
			self.uniforms3.time.value = document.time;
            self.camrespos = Math.floor(Camera.position.z) % 4000;
            if((self.camrespos >= 2000) && (!self.isplane))
            {
                self.plane1.position.z = self.plane2.position.z+2000.0;
                self.isplane = true;
            }
            else if((self.camrespos < 2000) && self.isplane)
            {
                self.plane2.position.z = self.plane1.position.z+2000.0;
                self.isplane = false;
            }
            super.update(self);
        }
		end () {
			super.end ();
		}
	}
}) (this);