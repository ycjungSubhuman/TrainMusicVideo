(function (scope) {
	scope.FishDeerAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			this.fish = document.fishd.clone();
			this.target.add(this.fish);
		}
		boom () {
			
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