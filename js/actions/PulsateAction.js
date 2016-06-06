(function (scope) {
	scope.PulsateAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			this.fish = Asset('goldfish').clone();
			this.fish.scale.set (20, 20, 20);
			this.fish.position.x = 1;
			Scene.add(new THREE.AmbientLight( 0x333333 ));
			this.target.add(this.fish);
			this.on("boom", this.boom);
			super.start ();
		}
		boom () {
			this.target.scale.set(1, 1, 1);
			console.log(this.fish);
			TweenLite.to(this.target.scale, 0.5, {
				x: 0.8,
				y: 0.8,
				z: 0.8,
				ease: Power4.easeOut,
			});
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