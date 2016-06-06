(function (scope) {
	scope.SmoothSweepShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.pivot = new THREE.Object3D (); //rotation pivot
			this.subject.add (this.pivot);
			this.pivot.add(this.target);
			this.target.position.z = 5;
		}
		start () {
			super.start ();
			var self = this;
			var posvec = new THREE.Vector3 ();
			posvec.x = Math.random () * 2 - 1;
			posvec.y = Math.random () * 2 - 1;
			posvec.z = Math.random () * 2 - 1;

			Player.timeline.add(TweenLite.to(this.target.position, 4 * this.duration, {
				x: self.target.position.x + posvec.x,
				y: self.target.position.y + posvec.y,
				z: self.target.position.z + posvec.z,
				ease: Power2.easeOut,
			}), this.time_start);
		}
		update (self) {
			//rotate camera around the object
			super.update (self);
		}
		end () {
			this.subject.remove (this.pivot);
			super.end ();
		}
	};
}) (this);