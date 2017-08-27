
class PositionBuilder extends Builder {

	build(space = "", ...args) {
		return super.build(space + this.constructor.separator, ...args);
	}

	buildSelf(space, ...args) {
		super.buildSelf(space, ...args);
		this._draw = draw(this._currentElement);
		let str = this._draw.rotate(this._draw.getParameter('angle'))
			.translate(this._draw.getParameter("x"), this._draw.getParameter("y"))
			.build();

		return space + str.split("\n").join("\n" + space) + "\n";
	}
}

PositionBuilder.separator = " ";
