(function (scope) {
	scope.DotsSwarmAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			super (target, time_start, time_end, track);
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