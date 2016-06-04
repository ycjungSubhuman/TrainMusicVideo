(function (scope) {
	scope.DotsAction = class extends Action {
		constructor (target, time_start, time_end, track) {
			//reference : https://github.com/mrdoob/three.js/blob/master/examples/webgl_points_sprites.html
			//generate a random geometry
			var params = [ //pairs of color * size
				[0x68522d, 0],
				[0x738655, 0],
				[0x7fb1ac, 0],
				[0x977c57, 0],
				[0xe6d3b9, 0],
			];
			var geometry = new THREE.Geometry ();
			for (var i=0; i<80; i++) {
				var vertex = new THREE.Vector3 ();
				vertex.x = Math.random() * 10 - 5;
				vertex.y = Math.random() * 10 - 5;
				vertex.z = Math.random() * 10 - 5;
				geometry.vertices.push(vertex);
			}
			//generate materials and add cloud to the scene
			var materials = [];
			for (var i=0; i<params.length; i++) {
				materials[i] = new THREE.PointsMaterial({
					color: params[i][0],
					map: Asset('textures/circle.png'),
					transparent: true,
					opacity: 1,
					alphaTest: 0.5,
					size: params[i][1],
					sizeAttenuation: true,
					depthTest: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending,
				});
				var cloud = new THREE.Points( geometry, materials[i] );
				cloud.rotation.x = Math.random() * 6;
				cloud.rotation.y= Math.random() * 6;
				cloud.rotation.z = Math.random() * 6;
				target.add (cloud);
			}
			super (target, time_start, time_end, track);
			this.params = params;
			this.materials = materials;
		}
		start () {
			//TODO: popappear render init
			//bind 'boom' event
			this.on("boom", this.boom);

			super.start ();
		}
		boom () {
			this.target.scale.set(1, 1, 1);
		}
		update (self) {
			var freqdata = Analyser.getFreqData();
			var size_sample = Math.floor(freqdata.length / self.params.length);

			for (var i=0; i<self.params.length; i++) {
				var sum = 0;
				for (var j=0; j<size_sample; j++) {
					sum += freqdata[i*size_sample + j];
				}
				self.materials[i].size = Math.pow((sum / size_sample) / 256, 1);
			}
			super.update(self);
		}
		end () {
			super.end ();
		}
	}
}) (this);
