#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_permittivity;
uniform float u_xPositions[20];
uniform float u_yPositions[20];
uniform float u_charges[20];

const float PI = 3.1415926535;

vec3 hsv2rgb(vec3 c) {
	c.r = clamp(c.r, 0.0, 1.0);
	c.g = clamp(c.g, 0.0, 1.0);
	c.b = clamp(c.b, 0.0, 1.0);
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
	float k = 1.0 / (4.0 * 3.1415926535897 * u_permittivity);

	vec2 st = gl_FragCoord.xy/u_resolution.xy;

	vec2 fieldVal = vec2(0, 0);

	for (int i = 0; i < 20; i++) {
		vec2 r = st - vec2(u_xPositions[i], u_yPositions[i]);
		float dist = length(r);
		r = normalize(r);
		if (dist != 0.0) {
			fieldVal += r * ((k * u_charges[i]) / (dist * dist));
		}
	}

	float angle = acos(normalize(fieldVal).x);
	if (fieldVal.y < 0.0) angle *= -1.0;
		
	vec3 hsbColor = vec3((PI)+angle, 100.0, length(fieldVal) / 20000000000.0);
	vec3 normalizedHsbColor = vec3(hsbColor.r / (2.0 * PI), hsbColor.g / 100.0, hsbColor.b / 100.0);

	gl_FragColor = vec4(hsv2rgb(normalizedHsbColor), 1.0);
}
