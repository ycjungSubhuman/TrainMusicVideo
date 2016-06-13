(function (scope) {
	scope.DeerAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
			this.deer = Asset('deer').clone();
			this.deer.scale.set(0.5, 0.5, 0.5);
			this.deer.rotation.x = -Math.PI/2;
			this.deer.rotation.z = Math.PI;
			var geo_plane = new THREE.PlaneGeometry( 20, 20, 200, 200 );
			var material = new THREE.MeshLambertMaterial( 0xffffff );
			this.plane = new THREE.Mesh(geo_plane, material);
			this.plane.rotation.x = -Math.PI/2;
			this.ambient = new THREE.AmbientLight(0x555511);

			var geo_lamp = new THREE.CubeGeometry (0.2, 0.2, 0.2);

			var light1 = new THREE.SpotLight();
			var light2 = new THREE.SpotLight();

			this.car = Asset('taxi').clone();
			this.car.scale.set(1.5, 1.5, 1.5);
			this.car.rotation.x = -Math.PI/2;

			this.car.position.z = -8;
			this.car.position.y = 1.3;
			this.car.add (light1);
			this.car.add (light2);

			light1.position.z = 0.85;
			light1.position.y = 0;
			light1.position.x = 0.2;
			light2.position.z = 0.85;
			light2.position.y = 0;
			light2.position.x = -0.2;
		}
		start () {
			//TODO: popappear render init
			this.target.add(this.deer);
			this.target.add(this.ambient);
			this.target.add(this.plane);
			this.target.add(this.car)

			Player.timeline.add(TweenLite.to(this.car.position, this.duration,{
				z: -5,
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