class Field {
	constructor(permittivity) {
		this.permittivity = permittivity;
		this.k = 1 / (4 * 3.1415926535897 * permittivity);
		this.pointCharges = [];
	}

	addPointCharge = (p) => {
		this.pointCharges.push(p);
	};

	getFieldAtPosition = (pos) => {
		let field = createVector(0, 0);
		for (let i = 0; i < this.pointCharges.length; i++) {
			let myPC = this.pointCharges[i];
			let r = p5.Vector.sub(pos, myPC.getPos());
			let distance = r.mag();
			r = r.normalize();
			if (distance != 0) {
				field.add(r.mult((this.k * myPC.getCharge()) / (distance * distance)));
			}
		}
		return field;
	};
}
