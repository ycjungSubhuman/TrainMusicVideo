(function (scope) {
	scope.Action = class {
		constructor (target, time_start, time_end, track) {
			this.target = target; //Object3D. Note that js uses closure by shared reference
			this.time_start = time_start; //double
			this.time_end = time_end; //double
			this.duration = time_end - time_start; //double
			this.track = track;
			this.isActive = false;
			//make it an event listener
			Emitter (this);
			this.on ("start", this.start);
			this.on ("end", this.end);
		}
		start () {
			Scene.add(this.target);
			this.isActive = true;
			Loop.loop(this.update);
		}
		update () {
			//do nothing. virtual method placeholder
		}
		end () {
			Scene.remove(this.target);
			this.isActive = false;
			Loop.stop(this.update);
		}
	};
}) (this);