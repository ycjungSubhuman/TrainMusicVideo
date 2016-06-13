(function (scope) {
	scope.CamShot = class extends Action {
		constructor (subject, time_start, time_end, duration) {
			var camera = new THREE.PerspectiveCamera( 75, 
				window.innerWidth / window.innerHeight,
				0.1, 40 );
			super (camera, time_start, time_end, duration);
			this.target.direction = new THREE.Vector3 (0, 0, -1);
			this.target.direye = new THREE.Vector3 (0, 0, -1);
			this.subject = subject;
			this.prevcamera = null;
		}
		start () {
			this.prevcamera = Camera;
			Camera = this.target; //change camera for this CamShot
			Emitter(scope.Camera);
			Camera.on("resize", function() {
				Camera.aspect = window.innerWidth / window.innerHeight;
				Camera.updateProjectionMatrix ();
			});
			super.start ();
		}
		update (self) {

			super.update (self);
		}
		end () {
			Camera = this.prevcamera;
			super.end ();
		}
	};
}) (this);