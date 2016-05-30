(function (scope) {
	scope.PulsateAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
			this.on("boom", this.boom);
		}
		start () {
			//TODO: popappear render init
			super.start ();
		}
		boom () {
			this.target.scale.set(1, 1, 1);
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