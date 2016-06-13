(function (scope) {
	scope.PulsatingMoonShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.pivot = new THREE.Object3D (); //rotation pivot
			this.subject.add (this.pivot);
			this.pivot.add(this.target);
			this.target.position.z = 5;
		}
		start () {
			this.on ("boom", this.boom);
			super.start ();
		}
		boom () {
			console.log("boom");
			if(this.tween) this.tween.kill();
			this.tween = TweenLite.to(this.pivot.rotation, 1, {
				z: this.pivot.rotation.z+1.2,
				ease: Power4.easeOut,
			});
		}
		update (self) {
			//rotate camera around the object
			this.target.direction = this.target.getWorldPosition().negate();
			this.target.position.z = 5 * Math.cos(this.pivot.rotation.z);
			this.target.position.x = 5 * Math.sin(this.pivot.rotation.z);
			super.update (self);
		}
		end () {
			super.end ();
			this.subject.remove (this.pivot);
		}
	};
}) (this);