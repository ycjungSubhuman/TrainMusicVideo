(function (scope) {
	scope.PulsateAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
			//TODO: implement init for this action 
		}
		start () {
			//TODO: popappear render init
			super.start ();
		}
		update () {
			//TODO: implement popappear update
		}
		end () {
			super.end ();
		}
	}
}) (this);