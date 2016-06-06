/* stores Action objects */
(function (scope) {
	this.ActionManager = {
		list: [],
		addAction: function (action) {
			this.list.push (action);
		},
		removeAction: function (action) {
			var index = this.list.indexOf(action);
			if (index > -1) {
				this.list.splice(index, 1);
			}
		},
		emitEvent: function (name_event, track) {
			_.each(this.list, function(action) {
				if (!track) { //track is not given
					action.emit(name_event);
				}
				else if(action.track == track) {
					action.emit(name_event);
				}
			});
		}
	}
}) (this);