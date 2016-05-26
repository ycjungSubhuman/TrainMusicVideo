/* a set of static methods for initiallizing timeline on Bootstrap */
(function (scope) {
	scope.SWriter = {
		/*
			@action : an Action object that specifies what will be happening in the
				specified time duration
			@shot_camera : an CamAction object that specifies how the camera will handle
				for the clip
			@time_start : double in seconds
			@time_duration : double in seconds
		*/
		addHead: function (action, shot_camera, 
			time_start, time_duration) {
			/* addes a clip with specified 
			Action and Camera Shot */
		},
		addTail: function (action, shot_camera, 
			time_end, time_duration) {
			/* addes a clip with specified 
			Action and Camera Shot */
		},
		addHeadTail: function (action, shot_camera, 
			time_start, time_end) {
			/* addes a clip with specified 
			Action and Camera Shot */
		}
	}
}) (this);