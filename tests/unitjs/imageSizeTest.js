
describe("imageSizeTest", function() {
	it("should get correct image size", function(done) {
		let url = Object.keys(__karma__.files).filter(k => k.match(/.*test.jpg/)).pop();
		imageSize(url).then(res => {
			expect(res.width).toBe(640);
			expect(res.height).toBe(452);
			done();
		});
	});
})