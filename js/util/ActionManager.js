/* stores Action objects */
(function (scope) {
	this.ActionManager = {
		list: [],
		list_cam: [],
		addAction: function (action, cam) {
			this.list.push (action);
			this.list_cam.push (cam);
		},
		removeAction: function (action) {
			var index = this.list.indexOf(action);
			if (index > -1) {
				this.list.splice(index, 1);
			}
		},
		removeCam: function (cam) {
			var index = this.list_cam.indexOf(cam);
			if (index > -1) {
				list_cam.splice(index, 1);
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
			_.each(this.list_cam, function(cam) {
				if (!track) {
					cam.emit(name_event);
				}
				if(cam.track == track) {
					cam.emit(name_event);
				}
			});
		}
	}
}) (this);