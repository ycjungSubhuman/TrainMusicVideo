(function (scope) {
	scope.FishNeedleAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			this.fish = Asset('goldfish').clone();
			this.fish.scale.set (20, 20, 20);
			this.target.add(new THREE.AmbientLight( 0x333333 ));
			this.target.add(this.fish);
			this.on("boom", this.boom);
			this.on("pluck", this.pluck);
			this.geo_needle = new THREE.TetrahedronGeometry( 0.03 );
			this.mat_needle = new THREE.MeshLambertMaterial( 0xffffff );
			this.light = new THREE.PointLight();
			this.light.intensity = 3;
			this.light.position.x = 2;
			this.light.position.y = 2;
			this.target.add(this.light);
			super.start ();
		}
		boom () {

		}
		pluck () {
			var pivot = new THREE.Object3D();
			var needle = new THREE.Mesh( this.geo_needle, this.mat_needle );
			this.fish.add(pivot);
			pivot.add(needle);
			needle.position.x = 0.5 + Math.random();

			pivot.rotation.x = Math.random() *2;
			pivot.rotation.y = Math.random() *2;
			pivot.rotation.z = Math.random() *2;
			needle.scale.x = 1 + Math.random() * 2;
			needle.scale.y = 0.3;
			needle.scale.z = 0.3;

			Player.timeline.add(TweenLite.to(needle.position, 0.1, {
				x: 0,
				ease: Power4.easeOut,
			}), Player.timeline.time());
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