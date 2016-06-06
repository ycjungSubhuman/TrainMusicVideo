/* a set of static methods for initiallizing timeline on Bootstrap */
(function (scope) {
	scope.SWriter = {
		/*
			@action : an Action object that specifies what will be happening in the
				specified time duration
		*/
		addCallBack: function (time, callback) {
			Player.timeline.add(callback, time);
		},
		addHead: function (action) {
			/* addes a clip with specified 
			Action and Camera Shot */
			ActionManager.addAction (action);
			Player.timeline.add(function() {
				action.emit("start");
			}, action.time_start);
			Player.timeline.add(function () {
				action.emit("end");
				ActionManager.removeAction (action);
			}, action.time_end);
		},
		addTail: function (action, shot_camera) {
			/* addes a clip with specified 
			Action and Camera Shot */
		},
		addHeadTail: function (action, shot_camera) {
			/* addes a clip with specified 
			Action and Camera Shot */
		}
	}
}) (this);