//after Project.js

function makeRequest (method, url) {
	return new Promise(function (resolve, reject) {
		var req = new XMLHttpRequest();
		req.open(method, url, true);
		req.onload = function () {
			resolve (req.response);
		}
		req.onerror = function () {
			reject ({
				status: this.status,
				statusText : req.statusText,
			});
		}
		req.send();
	});
}

var AssetManager = {
	init : function () {
		this.loaded = new Array();
	},
	load: function (name_file) {
		return new Promise(function (resolve, reject) {
			//send XMLHttpRequest to retrieve data of the file
			makeRequest ('GET', name_file)
			.then(function (response) {
				var type = name_file.split('.')[-1];

				if (type == 'midi') {

				}
				else if (type == 'obj') {
					var loader = THREE.OBJLoader();
					var obj = loader.parse(response.responseText);
					loaded[name_file] = obj;
					resolve({
						status: this.status,
					});
				}
				else {
					reject({
						status: this.status,
					});
				}
			}).catch (function (err) {
				console.log("Asset load failed ["
				 + err.statusText + "] : " + name_file);
				reject({
					status: this.status,
				});
			});
		});
	}
};