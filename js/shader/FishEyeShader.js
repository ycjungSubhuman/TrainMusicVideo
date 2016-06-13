FishEyeShader = {
    uniforms: {
		"tColor": { type: "t", value: null },
		"tDepth": { type: "t", value: null },
		"distance": { type: "f", value: 0.5 }, 
		"radius": { type: "f", value: 0.4 },
		"aspect": { type: "f", value: 1.0 }
	},
    
	vertexShader: [
		"varying vec2 Vertex_UV;",

		"void main() {",
			"Vertex_UV = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"
	].join( "\n" ),
    
    fragmentShader: [
    	"varying vec2 Vertex_UV;",
		
	    "uniform sampler2D tColor;",
		"uniform sampler2D tDepth;",
        
		"uniform float distance;",
		"uniform float radius;",
		"uniform float aspect;",
		
	    "const float PI = 3.141592;",
	    
    	"void main() {",
		    "vec2 uv;",
    		"vec2 xy = 2.0 * Vertex_UV - 1.0;",
			"float d = length(vec2(xy.x * aspect, xy.y));",
			"vec3 color = vec3(0.8, 1.0, 1.0);",
			"float lensSize = 2.0 * radius / cos(asin(radius / distance)) / distance;",
			
		    "if (d < lensSize - 0.002 && xy.y < lensSize * 0.75) {",
	    		"if (4.0 * xy.x * xy.x * aspect * aspect / 3.0 +",
				"256.0 * (xy.y - lensSize / 2.0) * (xy.y - lensSize / 2.0) < lensSize * lensSize)",
					"color = vec3(0.4, 0.73, 0.72);",
				"else {",
					"if (xy.y < lensSize / 2.0) {",				
						"d = length(xy * (2.0 - (atan(lensSize, distance))));",
				    	"float z = sqrt(1.0 - d * d);",
					    "float r = atan(d, z) / PI;",
    					"float theta = atan(xy.y, xy.x);",
						
			    		"uv.x = r * cos(theta) + 0.5;",
				    	"uv.y = r * sin(theta) + 0.5;",

						"color = texture2D(tColor, uv).rgb * 0.9 + vec3(0, 0.2, 0.2);",
					"} else {",
						"uv = Vertex_UV;",
						"color = texture2D(tColor, uv).rgb;",
					"}",
				"}",
    		"} else if (d > lensSize + 0.002 || xy.y > lensSize * 0.75) {",
	    		"uv = Vertex_UV;",
				"color = texture2D(tColor, uv).rgb;",
		    "}",
			
	    	"gl_FragColor.rgb = color;",
			"gl_FragColor.a = 1.0;",
	    "}"
    ].join( "\n" )
}