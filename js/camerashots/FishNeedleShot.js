(function (scope) {
	scope.FishNeedleShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.target.position.z = 5;
		}
		start () {
			this.on ("boom", this.boom);
			this.on ("pluck", this.pluck);
			super.start ();
		}
		boom () {
		}
		pluck () {
			console.log("woefj");
			this.subject.scale.set(1,1,1);
			Player.timeline.add(TweenLite.to(this.subject.scale, 0.3, {
				z: this.subject.scale.z+1.2,
				y: this.subject.scale.y+1.2,
				x: this.subject.scale.x+1.2,
				ease: Power4.easeOut,
			}), Player.timeline.time());
			
			Player.timeline.add(TweenLite.to(this.subject.rotation, 0.3, {
				z: this.subject.rotation.z+Math.random()*1.2,
				y: this.subject.rotation.y+Math.random()*1.2,
				x: this.subject.rotation.x+Math.random()*1.2,
				ease: Power4.easeOut,
			}), Player.timeline.time());
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