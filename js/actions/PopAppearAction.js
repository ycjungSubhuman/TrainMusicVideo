(function (scope) {
	scope.PopAppearAction = class extends Action {
		constructor (target, time_start, time_end, duration) {
			super (target, time_start, time_end, duration);
			//TODO: implement init for this action 
		}
		start () {
			super.start ();
			//TODO: popappear render init
		}
		update () {
			//TODO: implement popappear update
		}
		end () {
			super.end ();
		}
	}
}) (this);