(function (scope) {
	scope.Loop = {
		loop: function (callback) {
			TweenLite.ticker.addEventListener("tick", callback);
		},
		stop: function (callback) {
			TweenLite.ticker.removeEventListener("tick", callback);
		},
	}
}) (this);