var Shaders = {
	plane_vertex_default:`
		uniform float time;
		void main() {
			gl_Position = projectionMatrix *
			modelViewMatrix *
			vec4(position, 1);
		}

		`,
	plane_fragment_default:`
		uniform float time;
		void main() {
			gl_FragColor = vec4(sin(time), sin(time/4.0), 1.0, 1.0);
		}

	`,
	cubes_vertex_default:`
		uniform float time;
		void main() {
			gl_Position = projectionMatrix *
			modelViewMatrix *
			vec4(position, 1);
		}

		`,
	cubes_fragment_default:`
		uniform float time;
		void main() {
			gl_FragColor = vec4(sin(time), sin(time/4.0), 1.0, 1.0);
		}

	`,
	cubes_point_vertex_default: `
	    attribute float alpha;
	    attribute float size;
	    attribute vec3 ca;
	    varying vec3 vColor;
	    varying float vAlpha;

	    void main() {
	        vColor = ca;
	        vAlpha = alpha;
	        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	        gl_PointSize = size * (1.0+ 300.0 / length( mvPosition.xyz ) );
	        gl_Position = projectionMatrix * mvPosition;
	    }
	`,
	cubes_point_frag_default: `
	    uniform vec3 color;
	    uniform sampler2D map;
	    varying vec3 vColor;
	    varying float vAlpha;

	    void main() {
	        gl_FragColor = vec4( vColor, vAlpha );
	        gl_FragColor = vAlpha * texture2D( map, gl_PointCoord );
	    }
	`,
}