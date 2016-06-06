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
	},
	loadmodel: function (param) {
		return new Promise(function (resolve, reject) {
			var name = param[0];
			var list_path_obj = param[1].split('/');
			var path_obj = list_path_obj.splice(0, list_path_obj.length-1).join("/") + '/';
			var file_obj = list_path_obj.join("/");

			var list_path_mtl = param[2].split('/');
			var path_mtl = list_path_mtl.splice(0, list_path_mtl.length-1).join("/") + '/';
			var file_mtl = list_path_mtl.join("/");
			function onerror () {
				console.log("woefjwoeifj");
			}
			
			var loader = new THREE.MTLLoader();
			loader.setPath(path_mtl);
			loader.load(file_mtl, function(materials) {
				materials.preload();
				var objloader = new THREE.OBJLoader();
				objloader.setMaterials(materials);
				objloader.setPath(path_obj);
				objloader.load(file_obj, function (object) {
					if (object == undefined) {
						reject({
							status: 'load fail',
							statusText: 'load fail',
						});
					}
					AssetManager.loaded[name] = object;
					resolve({
						status: 'loaded',
					});
				}, undefined, onerror);
			}, undefined, onerror);

		});
	},
};