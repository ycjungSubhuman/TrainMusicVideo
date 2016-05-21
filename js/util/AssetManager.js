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
			.then(function (responseText) {
				var split_name = name_file.split('.');
				var type = split_name[split_name.length-1];
				if (type == 'midi') {
					console.log("midi found but did nothing het!");
				}
				else if (type == 'obj') {
					var loader = THREE.OBJLoader();
					var obj = loader.parse(responseText);
					AssetManager.loaded[name_file] = obj;
					resolve({
						status: this.status,
					});
				}
				else if (type == 'glsl') {
					AssetManager.loaded[name_file] = responseText;
					resolve({
						status: this.status,
					});
				}
				else {
					reject({
						status: this.status,
						statusText: name_file + " load failed",
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