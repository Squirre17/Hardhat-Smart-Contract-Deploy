// describe usually use anonymous function
const {ethers} = require('hardhat')
const {expect, assert} = require('chai')
describe("SimpleStorage", () => {
	let ssf		// Simple Storage Factory
	let ss		// Simple Storage 
	beforeEach(async () => {
		
		ssf = await ethers.getContractFactory(
			"SimpleStorage"
		)
		ss = await ssf.deploy()
	})

	it("Start with my favorite number", async () => {
		// current value
		const cv = await ss.retrieve()
		// expect value
		const ev = "0" 
		assert.equal(cv.toString(), ev)
	})
	it("Update equal test", async () => {
		await ss.store(3)
		const uv = await ss.retrieve()
		const ev = "3" 
		assert.equal(uv.toString(), ev)
		expect(uv.toString()).to.equal(ev)
	})
})
