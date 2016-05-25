(function (scope) {
	scope.PopAppearAction = class extends Action {
		constructor (target, start, end, duration) {
			super (target, start, end, duration);
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