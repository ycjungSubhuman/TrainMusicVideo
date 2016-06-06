(function (scope) {
	scope.CarSceneShot = class extends CamShot {
		constructor (subject, time_start, time_end, track) {
			super (subject, time_start, time_end, track);
			this.pivot = new THREE.Object3D (); //rotation pivot
			this.subject.add (this.pivot);
			this.pivot.add(this.target);
			this.target.position.x = 0;
			this.target.position.y = 10;
			this.target.lookAt(new THREE.Vector3(20,0,0));
			this.target.near = 0.1;
			this.target.far = 200;
			this.target.updateProjectionMatrix ();
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
			this.target.position.x += 1.6 
			
			super.update (self);
		}
		end () {
			super.end ();
			this.subject.remove (this.pivot);
		}
	};
}) (this);