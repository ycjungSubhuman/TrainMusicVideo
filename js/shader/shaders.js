var Shaders = {
	vertex_default:`
		void main() {
			gl_Position = projectionMatrix *
			modelViewMatrix *
			vec4(position, 1);
		}

		`,
	fragment_default:`
		void main() {
			gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
		}

	`,
}