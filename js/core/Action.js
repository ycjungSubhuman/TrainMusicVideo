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
			this.on ("restart", this.restart);
			this.on ("pause", this.pause);
			this.on ("end", this.end);
		}
		start () {
			Scene.add(this.target);
			this.isActive = true;

			var self = this;
			this.fun_update = function () {self.update(self);};
			Loop.loop(this.fun_update);
		}
		update (self) {
			//do nothing. virtual method placeholder
		}
		restart () {
			if (this.isActive) {
				Loop.loop(this.fun_update);
			}
		}
		pause () {
			Loop.stop(this.fun_update);
		}
		end () {
			Scene.remove(this.target);
			this.isActive = false;
			Loop.stop(this.fun_update);
		}
	};
}) (this);