(function (scope) {
	scope.FishDeerShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.target.position.z = -1;
			this.target.position.x = -0.8;
			this.target.position.y = 1.5;

			this.target.direction = new THREE.Vector3(1,0,0);
		}
		start () {
			//camera in
			Player.timeline.add(TweenLite.to(this.target.position, this.duration,{
				z: -2,
				x: -20,
				ease: Power2.easeIn,
			}), this.time_start);
			Player.timeline.add(TweenLite.to(this.target.direction, this.duration,{
				x: 1,
				y: -0.2,
				z: 0,
				ease: Power2.easeIn,
			}), this.time_start);

			super.start ();
		}
		update (self) {
			//rotate camera around the object
			super.update (self);
		}
		end () {
			super.end ();
		}
	};
}) (this);