(function (scope) {
	scope.DeerAliveAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			this.deer = Asset('deer').clone();
			target.add(new THREE.AmbientLight( 0xdddddd ));
			this.deer.scale.set(0.5, 0.5, 0.5);
			this.deer.rotation.x = -Math.PI/2;
			this.deer.rotation.z = Math.PI;
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			this.target.add(this.deer);
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