(function (scope) {
	scope.Loop = {
		loop: function (callback) {
			console.log("start");
			console.log(callback);
			TweenLite.ticker.addEventListener("tick", callback);
		},
		stop: function (callback) {
			console.log("pause");
			console.log(callback);
			TweenLite.ticker.removeEventListener("tick", callback);
		},
	}
}) (this);