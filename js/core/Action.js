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
			//TODO: implement init of this action(initialized on timeline header pass)
			this.isActive = true;
			this.emit("update");
		}
		update () {
			//do nothing
			if(this.isActive) {
				window.requestAnimationFrame(this.update);
			}
		}
		end () {
			this.isActive = false;
		}
	};
}) (this);