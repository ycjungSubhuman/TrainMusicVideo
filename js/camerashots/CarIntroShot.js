(function (scope) {
	scope.CarIntroShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.target.position.z = 5;
			this.target.position.x = -0.8;
			this.target.position.y = 1.5;

			this.target.direction = new THREE.Vector3(0,0,-1);
		}
		start () {
			//camera in
			Player.timeline.add(TweenLite.to(this.target.position, this.duration/2,{
				z: 0,
				x: 4,
				ease: Power2.easeIn,
			}), this.time_start);
			Player.timeline.add(TweenLite.to(this.target.direction, this.duration/2,{
				x: -1,
				y: -0.2,
				z: 0,
				ease: Power2.easeIn,
			}), this.time_start);

			Player.timeline.add(TweenLite.to(this.target.position, this.duration,{
				z: -2,
				y: 3,
				x: 0,
				ease: Power2.easeOut,
			}), this.time_start+this.duration/2);
			Player.timeline.add(TweenLite.to(this.target.direction, this.duration,{
				x: 0.2,
				y: -0.8,
				z: 1,
				ease: Power2.easeOut,
			}), this.time_start+this.duration/2);

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