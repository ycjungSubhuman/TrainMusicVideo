var Shaders = {
	plane_vertex_default:`
		uniform float time;
		
		varying vec2 uVu;
		//uniform int moonPhase;
		void main() {
			uVu = uv;
			
			float worldTrome = time*64.0;
			//worldTrome = worldTime + (24000 * moonPhase);
			vec4 pos = modelViewMatrix * vec4(position, 1.0);
			float distanceSquared = pos.x * pos.x + pos.z * pos.z;
			pos.x += sin(distanceSquared*sin(worldTrome / (143.0 * 8.0)) / 1000.0);
			pos.y += sin(distanceSquared*sin(worldTrome / (143.0 * 8.0)) / 2000.0);
			float y = pos.y;
			float x = pos.x;
			float z = pos.z;
	
			float om = (sin(distanceSquared*sin(worldTrome / 131072.0) / 5000.0) * sin(worldTrome / 400.0));
			pos.y = x*sin(om) + y*cos(om);
			pos.x = 0.8 * (x*cos(om) - y*sin(om));
			pos.z = z;
			gl_Position = projectionMatrix * pos; 
		}

		`,
	plane_fragment_default:`
		uniform float time;
		uniform sampler2D tex;
		uniform bool istextured;
		uniform float texrepeat;

		varying vec2 uVu;
		void main() {
			if(istextured)
			{
				gl_FragColor = texture2D(tex, uVu * texrepeat);
			}
			else
			{
				//gl_FragColor = vec4(sin(time), sin(time/4.0), 1.0, 1.0);
				//vec4 col = texture2D(tex, uVu);
				gl_FragColor = vec4(1.0,1.0,1.0,1.0);	
			}
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
	vd: `
		void main() {
			gl_Position = projectionMatrix *
			modelViewMatrix *
			vec4(position, 1);
		}
	`,
	fd: `
		uniform Sampler2D map;
		void main() {
			gl_FragColor = texture (map, uV);
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

	        gl_PointSize = size * (1.0 + 300.0 / length( mvPosition.xyz ) );
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