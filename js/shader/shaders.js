var Shaders = {
	vertex_default:`
		uniform float time;
		void main() {
			gl_Position = projectionMatrix *
			modelViewMatrix *
			vec4(position, 1);
		}

		`,
	fragment_default:`
		uniform float time;
		void main() {
			gl_FragColor = vec4(sin(time), sin(time/4.0), 1.0, 1.0);
		}

	`,
}