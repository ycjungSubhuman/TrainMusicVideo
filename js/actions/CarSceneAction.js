(function (scope) {
	scope.CarSceneAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
            var geo_plane = new THREE.PlaneGeometry(2000, 900, 200, 20);
           
			geo_plane.rotateX(-Math.PI/2);
			geo_plane.rotateY(-Math.PI/2);
			
			var aspalt = Asset('textures/aspalt.png'); 
			aspalt.wrapS = aspalt.wrapT = THREE.RepeatWrapping;
			aspalt.repeat.set( 4, 20 );

			var bdtex = Asset('obj/building/building01.png');
			var nightbdtex = Asset('obj/building_night/building_night.png');
			var lamptex = Asset('obj/streetlamp/streetlamp.png');

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
			
			geo_plane = new THREE.PlaneGeometry(3, 52, 1, 1);
			geo_plane.rotateX(-Math.PI/2);
			
			this.uniforms2 = {
        		time: {type: "f", value: document.time},
				istextured: {type: "b", value: false},
				tex: {type: "t", value: aspalt},
				texrepeat: {type: "f", value: 20.0},
				color: {type:"v4", value: new THREE.Vector4(1.0,1.0,1.0,1.0)},
        	};
			
			var material2 = new THREE.ShaderMaterial({
		        uniforms: this.uniforms2,
		        vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
	        });
			
			for(var i=0; i<25; i++)
			{
				var roadline1 = new THREE.Mesh( geo_plane, material2 );
				var roadline2 = new THREE.Mesh( geo_plane, material2 );
				roadline1.position.y = 0.2;
				roadline1.position.z = -960 + i*80;
				roadline2.position.y = 0.2;
				roadline2.position.z = -960 + i*80;
				this.plane1.add(roadline1);
				this.plane2.add(roadline2);
			}
<<<<<<< HEAD
			
			/*for(var i=0; i<50; i++)
			{
				var bu1 = Asset('building1');
				var bu2 = Asset('building2');
				bu1.scale.copy(new THREE.Vector3(40.0 / 48.0704, ((Math.random() * 20.0) + 50.0) / 77.0, 40.0 / 39.4836));
				bu2.scale.copy(new THREE.Vector3(40 / 53, ((Math.random() * 20.0) + 50.0) / 61.0, 40 / 53));
				bu1.position.x = i*40 - 980;
				bu2.position.x = i*40 - 980;
				this.plane1.add(bu1);
				this.plane2.add(bu2);
			}*/
			
            this.camrespos = Math.floor(Camera.position.x) % 4000;
			
			var tmp = new THREE.Object3D ();
			tmp.add(this.plane1);
			tmp.add(this.plane2);
			target.add (tmp);
=======

			this.uniforms3 = {
        		time: {type: "f", value: document.time},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: bdtex},
				texrepeat: {type: "f", value: 1},
        	};

			this.uniforms4 = {
				time: {type: "f", value: document.time},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: nightbdtex},
				texrepeat: {type: "f", value: 1},
			}

			this.uniforms5 = {
				time: {type: "f", value: document.time},
				istextured: {type: "b", value: true},
				tex: {type: "t", value: lamptex},
				texrepeat: {type: "f", value: 1},
			}
			this.isboom = false;
			this.istschack = false;
>>>>>>> origin/CarScene2
		}
		start () {
			var material3 = new THREE.ShaderMaterial({
				uniforms: this.uniforms3,
				vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
			});

			var material4 = new THREE.ShaderMaterial({
				uniforms: this.uniforms4,
				vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
			});

			var material5 = new THREE.ShaderMaterial({
				uniforms: this.uniforms5,
				vertexShader: Shaders.plane_vertex_default,
		        fragmentShader: Shaders.plane_fragment_default,
		        wireframe: false,
			});

			this.bd = Asset('building').clone();
			this.bd.children[0].material = material3;
			this.bd.rotation.y = Math.PI/2;

			this.nightbd = Asset('nightbuilding').clone();
			this.nightbd.children[0].material = material4;
			

			this.stlamp = Asset('streetlamp').clone();
			this.stlamp.children[0].material = material5;
			//this.stlamp.rotation.y = Math.PI/2;

            this.camrespos = Math.floor(Camera.position.z) % 4000;
			
			this.tmp = new THREE.Object3D ();
			this.tmp.add(this.plane1);
			this.tmp.add(this.plane2);
			this.target.add (this.tmp);

			this.queue1 = [new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D ()];
			this.queue2 = [new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D (),new THREE.Object3D ()];

			//TODO: popappear render init            
            this.plane1.position.z = 1000;
	        this.plane2.position.z = 3000;

			this.queue3 = [];
			this.queue4 = [];

			for(var i=1; i<7; i++)
			{
				var bu1 = this.bd.clone();
				var bu2 = this.bd.clone();
				var buY = ((Math.random() * 50.0) + 100.0) / 90.0;
				bu1.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
				bu1.position.z = 49.6*4.0*i;
				bu1.position.x = 600;
				bu1.position.y = buY;
				bu2.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
				bu2.position.z = 49.6*4.0*i;
				bu2.position.x = -600;
				bu2.position.y = buY;
				this.tmp.add(bu1);
				this.tmp.add(bu2);
				this.queue3.push(bu1);
				this.queue3.push(bu2);
			}

			this.on("boom", this.boom);
			this.on("Tschack_add", this.Tschack_add);
			this.on("Bassdrum_add", this.Bassdrum_add);
			super.start ();
		}
		boom () {
			if(this.istschack)
			{
				this.istschack = false;
			}
			else
			{
				if(this.queue1.length > 0)
				{
					if (this.queue1[0].position.z + 20.0 < Camera.position.z)
					{
						this.tmp.remove(this.queue1[0]);
						this.tmp.remove(this.queue2[0]);
						this.queue1.shift();
						this.queue2.shift();
					} 
				}
				var bu1 = this.bd.clone();
				var bu2 = this.bd.clone();
				var buY = ((Math.random() * 50.0) + 100.0) / 90.0;
				bu1.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
				bu1.position.z = Camera.position.z + 49.6*4.0*6.0;
				bu1.position.x = 600;
				bu1.position.y = buY;
				bu2.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
				bu2.position.z = Camera.position.z + 49.6*4.0*6.0;
				bu2.position.x = -600;
				bu2.position.y = buY;
				this.tmp.add(bu1);
				this.tmp.add(bu2);
				this.queue1.push(bu1);
				this.queue2.push(bu2);
				this.isboom = true;

				//this.Bassdrum_add();
			}
		}
		Tschack_add (){
			if(!isboom)
			{
				this.boom();
				this.istschack = true;
			}
			this.tmp.remove(this.queue1[5]);
			var bu1 = this.nightbd.clone();
			var bu2 = this.nightbd.clone();  
			var buY = ((Math.random() * 50.0) + 100.0) / 90.0;
			bu1.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
			bu1.position.z = Camera.position.z + 49.6*4.0*6.0;
			bu1.position.x = 600;
			bu1.position.y = buY;
			bu2.scale.copy(new THREE.Vector3(100.0 / 30.0, buY, 100.0 / 22.0));
			bu2.position.z = Camera.position.z + 49.6*4.0*6.0;
			bu2.position.x = -600;
			bu2.position.y = buY;
			this.tmp.add(bu1);
			this.tmp.add(bu2);
			this.queue1[5] = bu1;
			this.queue2[5] = bu2;
			this.isboom = false;
		}
		Bassdrum_add(){
			//var lamp1 = this.stlamp.clone();
			var lamp1 = this.nightbd.clone();
			var lamp2 = this.stlamp.clone();
			console.log("bd:"+lamp1);
			//lamp1.scale.copy(new THREE.Vector3(100.0 / 19.0, 100.0/47.0, 22.0));
			lamp1.position.z = Camera.position.z + 49.6*4.0*6.0;
			lamp1.position.x = 0;
			lamp1.position.y = 23;
			console.log("bd::"+lamp1.position.z);
			lamp2.position.z = Camera.position.z + 49.6*4.0*6.0;
			lamp2.position.x = 400;
			lamp2.position.y = 23;
			this.tmp.add(lamp1);
			this.tmp.add(lamp2);
			this.queue4.push(lamp1);
			this.queue4.push(lamp2);
		}
		update (self) {
			//TODO: implement popappear update
			document.time += 0.08;
            self.uniforms1.time.value = document.time;
			self.uniforms2.time.value = document.time;
			self.uniforms3.time.value = document.time;
			self.uniforms4.time.value = document.time;
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
			if(self.queue4.length > 0)
			{
				if (self.queue4[0].position.z < Camera.position.z)
				{
					self.tmp.remove(self.queue4[0]);
					self.queue4.shift();						
				} 
			}
            super.update(self);
        }
		end () {
			for(var i=0; this.queue3.length != 0; i++)
					{
						this.tmp.remove(this.queue3[0]);
						this.queue3.shift();
					}
			super.end ();
		}
	}
}) (this);