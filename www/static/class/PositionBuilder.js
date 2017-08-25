
class PositionBuilder extends Builder {

	build(space = "", ...args) {
		return super.build(space + this.constructor.separator, ...args);
	}

	buildSelf(space, ...args) {
		super.buildSelf(space, ...args);
		return space + draw(this._currentElement).label().build().split("\n").join("\n" + space) + "\n";
	}
}

PositionBuilder.separator = " ";
