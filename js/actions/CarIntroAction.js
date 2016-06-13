(function (scope) {
	scope.CarIntroAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
			var geo_plane = new THREE.PlaneGeometry( 100, 100, 400, 400 );
			var texture = Asset('textures/aspalt2.png');
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 100, 100 );
			var material = new THREE.MeshLambertMaterial( {
				color: 0xffffff,
				map: texture,
			});
			this.plane = new THREE.Mesh(geo_plane, material);
			this.plane.rotation.x = -Math.PI/2;
			this.ambient = new THREE.AmbientLight(0x030303);

			var geo_lamp = new THREE.CubeGeometry (0.2, 0.2, 0.2);

			var plight1 = new THREE.PointLight(0xffffdd);
			plight1.intensity = 0.8;
			var plight2 = plight1.clone();

			var geo_flare = new THREE.Geometry ();
			geo_flare.vertices.push(new THREE.Vector3(0,0,0));
			var mat_flare = new THREE.PointsMaterial({
					color: 0xffff00,
					map: Asset('textures/lensflare0.png'),
					transparent: true,
					opacity: 1,
					alphaTest: 0,
					size: 8,
					sizeAttenuation: true,
					blending: THREE.AdditiveBlending,
				});
			var flare = new THREE.Points(geo_flare, mat_flare);


			this.light1 = new THREE.SpotLight(0xffffdd);
			this.light1.target.position.z = 100000;
			this.light1.add(plight1);
			this.light1.add(flare);

			this.light2 = new THREE.SpotLight(0xffffdd);
			this.light2.target.position.z = 100000;
			this.light2.add(plight2);
			this.light2.add(flare.clone());

			Scene.add(this.light1.target);
			Scene.add(this.light2.target);
			
			this.car = Asset('taxi');
			this.car.scale.set(1.5, 1.5, 1.5);
			this.car.rotation.x = -Math.PI/2;

			this.car.position.y = 1;
			this.car.add (this.light1);
			this.car.add (this.light2);

			this.light1.position.z = 0.15;
			this.light1.position.y = -1.6;
			this.light1.position.x = 0.6;

			this.light2.position.z = 0.15;
			this.light2.position.y = -1.6;
			this.light2.position.x = -0.6;
		}
		start () {
			//TODO: popappear render init
			this.target.add(this.ambient);
			this.target.add(this.plane);
			this.target.add(this.car)

			//light direction

			Player.timeline.add(TweenLite.to(this.car.position, this.duration,{
				z: 10,
				ease: Power2.easeIn,
			}), this.time_start);

			super.start();
		}
		boom () {

		}
		update (self) {
			//TODO: implement popappear update

			super.update(self);
		}
		end () {
			super.end ();
		}
	}
}) (this);