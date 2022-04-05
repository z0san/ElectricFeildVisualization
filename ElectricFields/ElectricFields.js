let n = 20;
let deltaT = 0.00005;

let pointCharges = [];
let f = new Field(8.85418782e-12);

let debugPCPositions = [
	[740.53033, 242.93774, 0.0],
	[1014.6804, 308.81152, 0.0],
	[259.37213, 587.90857, 0.0],
	[623.41156, 265.09467, 0.0],
	[825.2103, 637.3064, 0.0],
	[896.42267, 562.4817, 0.0],
	[733.23364, 166.10883, 0.0],
	[73.643005, 698.1762, 0.0],
	[815.3712, 274.0772, 0.0],
	[592.60614, 248.419, 0.0],
	[929.9206, 616.7311, 0.0],
	[152.48853, 221.82452, 0.0],
	[998.6251, 469.19, 0.0],
	[67.17029, 91.1626, 0.0],
	[71.18628, 125.18701, 0.0],
	[92.9303, 346.22662, 0.0],
	[434.65387, 954.375, 0.0],
	[895.3764, 694.1558, 0.0],
	[588.9063, 1.9272461, 0.0],
	[406.01276, 511.8604, 0.0],
];

function setup() {
	createCanvas(1024, 1024);
	randomSeed(123);

	for (var i = 0; i < n; i++) {
		pc = new PointCharge(debugPCPositions[i][0], debugPCPositions[i][1], 1, 1);
		pointCharges.push(pc);
		f.addPointCharge(pc);
	}
}

function draw() {
	background(0);
	console.log(frameRate());

	//show field
	colorMode(HSB, 2 * PI, 100, 100);
	for (let i = 0; i < 1024; i++) {
		for (let j = 0; j < 1024; j++) {
			fieldVal = f.getFieldAtPosition(createVector(i, j));
			set(i, j, color(PI - fieldVal.heading(), 100, fieldVal.mag() / 20000));
		}
	}
	updatePixels();

	// show points
	colorMode(RGB, 255);
	for (let i = 0; i < n; i++) {
		let pc = pointCharges[i];
		pc.move(f, deltaT);
		pc.show();
	}

	// saveFrame("A0/####.png");
}
