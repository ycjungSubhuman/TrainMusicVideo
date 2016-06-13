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
			this.geo_needle = new THREE.TetrahedronGeometry( 1 );
			this.mat_needle = new THREE.MeshLambertMaterial( 0xffffff );
			this.light = new THREE.PointLight();
			this.light.position.x = 5;
			this.light.position.y = 5;
			this.target.add(this.light);
			super.start ();
		}
		boom () {

		}
		pluck () {
			var pivot = new THREE.Object3D();
			var needle = new THREE.Mesh( this.geo_needle, this.mat_needle );
			pivot.add(needle);
			needle.position.x = 3 + Math.random();

			pivot.rotation.x = Math.random() *2;
			pivot.rotation.y = Math.random() *2;
			pivot.rotation.z = Math.random() *2;
			needle.scale.x = Math.random() * 2;

			Player.timeline.add(TweenLite.to(needle.position, 0.3, {
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