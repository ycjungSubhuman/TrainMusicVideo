(function (scope) {
	scope.Action = class {
		constructor (target, start, end, duration) {
			this.target = target; //Object3D
			this.start = start; //double
			this.end = end; //double
			this.duration = duration; //double
			this.isActive = false;
			Emitter(this);
			this.on ("start", this.start);
			this.on ("end", this.end);
		}
		start () {
			this.isActive = true;
			Loop.loop(this.update);
		}
		update () {
			//do nothing. virtual method placeholder
		}
		end () {
			this.isActive = false;
			Loop.stop(this.update);
		}
	};
}) (this);