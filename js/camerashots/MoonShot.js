(function (scope) {
	scope.MoonShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.pivot = new THREE.Object3D ();
			this.subject.add (this.pivot);
			this.on("boom", this.boom);
		}
		start () {
			this.pivot.add(this.target);
			this.target.position.z = 5;
			super.start ();
		}
		boom () {
			console.log("boom");
			this.target.lookAt(new THREE.Vector3(0,0,0));
			if(this.tween) this.tween.kill();
			this.tween = TweenLite.to(this.subject.rotation, 0.5, {
				x: this.subject.rotation.x+1.5, 
				y: this.subject.rotation.y+1,
				z: this.subject.rotation.z+1.2,
				ease: Power4.easeOut,
			});
		}
		update () {
			super.update ();
		}
		end () {
			this.subject.remove (this.pivot);
			super.end ();
		}
	};
}) (this);