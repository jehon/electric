
class PositionBuilder extends Builder {

	build(plan, space = "", ...args) {
		return super.build(plan, space + this.constructor.separator, ...args);
	}

	buildSelf(plan, space, ...args) {
		super.buildSelf(plan, space, ...args);

		if (this._currentElement.getVal("plan", false) != plan) {
			return "";
		}

		this._draw = draw(this._currentElement);

		let str = this._draw
			.rotate(this._draw.getParameter('orientation'))
			.rotatedLabel(("getName" in this._currentElement) ? this._currentElement.getName() : false, 
				this._currentElement.getVal("width"), 
				this._currentElement.getVal("height") / 2,
				this._currentElement.getVal("orientation", 0))
			.translate(this._draw.getParameter("x"), this._draw.getParameter("y"))
			.build();

		return space + str.split("\n").join("\n" + space) + "\n";
	}
}

PositionBuilder.separator = " ";
