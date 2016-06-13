(function (scope) {
	scope.GoldfishShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.target.position.x = 0;
            this.target.position.y = 0;
            this.target.position.z = 0.4;
		}
		start () {
			this.on ("boom", this.boom);
			super.start ();
		}
		boom () {
			console.log("boom");
			/*if(this.tween) this.tween.kill();
			this.tween = TweenLite.to(this.pivot.rotation, 1, {
				z: this.pivot.rotation.z+1.2,
				ease: Power4.easeOut,
			});*/
		}
		update (self) {
			this.target.position.z += 0.001;
			super.update (self);
		}
		end () {
			super.end ();
			this.subject.remove (this.pivot);
		}
	};
}) (this);