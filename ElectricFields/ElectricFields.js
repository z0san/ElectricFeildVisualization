let n = 20;
let deltaT = 0.0005;

let pointCharges = [];
let f = new Field(8.85418782e-12);

let fieldImg;
let fieldShader;

function preload() {
	// load shader
	fieldShader = loadShader("shaders/field.vert", "shaders/field.frag");
}

function setup() {
	randomSeed(123);
	pixelDensity(1);

	createCanvas(1024, 1024);
	fieldImg = createGraphics(1024, 1024, WEBGL);

	for (var i = 0; i < n; i++) {
		pc = new PointCharge(random(0, width), random(0, height), 1, 1);
		pointCharges.push(pc);
		f.addPointCharge(pc);
	}
}

function draw() {
	background(0);
	// console.log(frameRate());
	// noLoop();

	//show field
	// colorMode(HSB, 2 * PI, 100, 100);
	// for (let i = 0; i < 1024; i++) {
	// 	for (let j = 0; j < 1024; j++) {
	// 		fieldVal = f.getFieldAtPosition(createVector(i, j));
	// 		set(i, j, color(PI - fieldVal.heading(), 100, fieldVal.mag() / 20000));
	// 	}
	// }
	// updatePixels();

	fieldShader.setUniform("u_resolution", [width, width]);
	fieldShader.setUniform("u_permittivity", 8.85418782e-12);
	fieldShader.setUniform(
		"u_xPositions",
		pointCharges.map((pc) => pc.pos.x / height)
	);
	fieldShader.setUniform(
		"u_yPositions",
		pointCharges.map((pc) => 1 - pc.pos.y / width)
	);
	fieldShader.setUniform(
		"u_charges",
		pointCharges.map((pc) => pc.charge)
	);
	fieldImg.shader(fieldShader);

	fieldImg.rect(0, 0, width, height);

	image(fieldImg, 0, 0);

	// show points
	colorMode(RGB, 255);
	for (let i = 0; i < n; i++) {
		let pc = pointCharges[i];
		pc.move(f, deltaT);
		pc.show();
	}

	// saveFrame("A0/####.png");
}
