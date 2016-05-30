(function (scope) {
	scope.MoonShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.pivot = new THREE.Object3D (); //rotation pivot
			this.subject.add (this.pivot);
			this.pivot.add(this.target);
			this.target.position.z = 5;
		}
		start () {
			super.start ();
		}
		update (self) {
			//rotate camera around the object
			this.pivot.rotation.z += 0.05;
			this.target.position.z = 5 * Math.cos(this.pivot.rotation.z);
			this.target.position.x = 5 * Math.sin(this.pivot.rotation.z);
			this.target.lookAt(new THREE.Vector3(0,0,0));
			super.update (self);
		}
		end () {
			this.subject.remove (this.pivot);
			super.end ();
		}
	};
}) (this);