(function (scope) {
	scope.DotsAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			var geo_plane = new THREE.PlaneGeometry( 10, 10, 10, 10 );
			var mat_point = new THREE.PointsMaterial({
				color: 0xffffff,
				//map: Asset('textures/circle.png'),
				transparent: true,
				opacity: 1,
				alphaTest: 0.5,
				sizeAttenuation: true,
				depthTest: true,
				depthWrite: false,
			});
			var plane = new THREE.Points( geo_plane, mat_point );
			target.add (plane);
			console.log (plane);
			super (target, time_start, time_end, track);
		}
		start () {
			//TODO: popappear render init
			//bind 'boom' event
			this.on("boom", this.boom);

			super.start ();
		}
		boom () {
			this.target.scale.set(1, 1, 1);
		}
		update (self) {
			//TODO: implement popappear update
			super.update(self);
		}
		end () {
			super.end ();
		}
	}
}) (this);