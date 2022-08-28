const {task} = require('hardhat/config')

/* task(name, description)
	.addParam(toTask)
	.setAction(actually do)
*/
task("block-number", "Prints the current block number")
	.setAction(
		// hre => hardhat runtime envirn
		// it can access all packages imporyed
		async(taskArgs, hre) =>{
			// blocknumber
			const bn = await hre.ethers.provider
								.getBlockNumber()
			console.log(`Blocknumber is ${bn}`)
		}
	)
