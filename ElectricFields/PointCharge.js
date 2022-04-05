class PointCharge {
	constructor(x, y, charge, mass) {
		this.pos = createVector(x, y);
		this.velocity = createVector(0, 0);
		this.charge = charge;
		this.mass = mass;
	}

	move = (field, delta) => {
		let fieldAtPosition = field.getFieldAtPosition(this.pos);
		let force = p5.Vector.mult(fieldAtPosition, this.charge);
		let acceleration = p5.Vector.div(force, this.mass);
		this.velocity.add(acceleration.mult(delta));
		this.pos.add(this.velocity.mult(delta));
	};

	show = () => {
		noStroke();
		fill(255, 255, 255);
		circle(this.pos.x, this.pos.y, 5);
	};

	getPos = () => this.pos;
	getCharge = () => this.charge;
}
