
class PositionBuilder extends Builder {
	buildSelf(...args) {
		super.buildSelf(...args);
		return draw(this._currentElement).label().build();
	}
}
