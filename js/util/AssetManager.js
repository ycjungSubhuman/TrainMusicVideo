//after Project.js

function makeRequest (method, url, type) {
	return new Promise(function (resolve, reject) {
		var req = new XMLHttpRequest();
		req.open(method, url, true);
		if (type === "mid") {
			req.responseType = "arraybuffer";
		}
		if (type === 'png') {
			resolve (null);
		}
		req.onload = function () {
			resolve (req.response);
		}
		req.onerror = function () {
			reject ({
				status: this.status,
				statusText : url + "response couldn't be retreived",
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
			var split_name = name_file.split('.');
			var type = split_name[split_name.length-1];

			makeRequest ('GET', name_file, type)
			.then(function (response) {
				if (type === 'mid') {
					AssetManager.loaded[name_file] = new MIDIFile(response);
					resolve({
						status: this.status,
					});
				}
				else if (type === 'obj') {
					var loader = new THREE.OBJLoader();
					var obj = loader.parse(response);
					AssetManager.loaded[name_file] = obj;
					resolve({
						status: this.status,
					});
				}
				else if (type === 'mtl') {
					var loader = new THREE.MTLLoader();
					var mat = loader.parse(response);
					AssetManager.loaded[name_file] = mat;
					resolve({
						status: this.status,
					});
				}
				else if (type === 'glsl') {
					AssetManager.loaded[name_file] = response;
					resolve({
						status: this.status,
					});
				}
				else if (type === 'png') {
					var loader = new THREE.TextureLoader ();
					var texture = loader.load(name_file);
					AssetManager.loaded[name_file] = texture;
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
					statusText: err.statusText,
				});
			});
		});
	}
};