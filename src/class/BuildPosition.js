
class BuildPosition extends BuildName {
	build(paramsOrPlan = false) {
		if (typeof(paramsOrPlan) == "string" || !paramsOrPlan) {
			// Initial call
			this.plan = paramsOrPlan;
			this.space = "";
			return super.build({});
		} else {
			// Recursive call
			this.plan = paramsOrPlan.position.plan;
			this.space = paramsOrPlan.position.space + this.constructor.separator;
			return super.build(paramsOrPlan);
		}
		
	}

	getDescendantBuildParameters(params) {
		params.position = { plan: this.plan, space: this.space + ' ' };
		return super.getDescendantBuildParameters(params);
	}

	buildSelf() {
		super.buildSelf();

		if (this._currentElement.getVal("plan") != this.plan) {
			return "";
		}

		let svg = 
`<g type='translate' transform='translate(${this._currentElement.getVal('x')}, ${this._currentElement.getVal('y')})'>
	<g type='rotate' transform='rotate(${this._currentElement.getVal('orientation')})'>
		${draw(this._currentElement).build()}
	</g>
	${this.rotatedLabel()}
</g>`;

		return this.space + svg.split("\n").join("\n" + this.space) + "\n";
	}

	rotatedLabel() {
		let label = ("getName" in this._currentElement) ? this._currentElement.getName() : "";
		if (!label) {
			return "";
		}

		const tp = away(this._currentElement.getVal("width"), 
			this._currentElement.getVal("toTop"), 
			this._currentElement.getVal("orientation"));

//					<circle cx=0 cy=0 r=2 fill=red />

		return `<g transform='translate(${tp.x}, ${tp.y})'>
					<g transform='rotate(45)'>
	                	<text x=2 y="-2">${label}</text>
		            </g>
		        </g>`
	}
}

BuildPosition.separator = " ";
