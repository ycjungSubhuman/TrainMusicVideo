(function (scope) {
	scope.MoonShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.rot = 0;
			this.target.position.z = 5;
		}
		start () {
			super.start ();
		}
		update (self) {
			//rotate camera around the object
			this.rot += 0.01;
			this.target.position.copy(this.subject.position);
			this.target.position.z += 5 * Math.cos(this.rot);
			this.target.position.x += 5 * Math.sin(this.rot);
			this.target.direction = this.subject.getWorldPosition().clone().sub(this.target.getWorldPosition()).normalize();
			super.update (self);
		}
		end () {
			this.subject.remove (this.pivot);
			super.end ();
		}
	};
}) (this);