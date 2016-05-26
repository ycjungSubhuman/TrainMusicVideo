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
}