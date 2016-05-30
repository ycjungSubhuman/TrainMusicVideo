/* a set of static methods for initiallizing timeline on Bootstrap */
(function (scope) {
	scope.SWriter = {
		/*
			@action : an Action object that specifies what will be happening in the
				specified time duration
			@shot_camera : an CamAction object that specifies how the camera will handle
				for the clip
		*/
		addCallBack: function (time, callback) {
			Player.timeline.add(callback, time);
		},
		addHead: function (action, shot_camera) {
			/* addes a clip with specified 
			Action and Camera Shot */
			ActionManager.addAction (action, shot_camera);
			Player.timeline.add(function() {
				action.emit("start");
				shot_camera.emit("start");
			}, action.time_start);
			Player.timeline.add(function () {
				action.emit("end");
				shot_camera.emit("end");
				ActionManager.removeAction (action);
				ActionManager.removeCam (shot_camera);
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