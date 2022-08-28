const {ethers, run, network} = require('hardhat');
require("@nomiclabs/hardhat-etherscan");

async function main(){
	const SimpleStorageFatory = await ethers.getContractFactory(
		"SimpleStorage"
	)
	console.log("Deploying ...")
	const simpleStorage = await SimpleStorageFatory.deploy()
	await simpleStorage.deployed()
	console.log(`Deployed contract at ${simpleStorage.address}`)
	// We dont need to verify in local network
	if(network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY){
		// is best way to wait a few blocks to be mined
		// testnet take a little bit extra time
		console.log("Time to verify")
		await simpleStorage.deployTransaction.wait(6)
		await verify(simpleStorage.address, [])
	}
	const currentValue = await simpleStorage.retrieve()
	console.log(`Current Value is ${currentValue}`)

	const txnResp = await simpleStorage.store(7)
	await txnResp.wait(1)
	const updatedVal = await simpleStorage.retrieve()
	console.log(`Updated Value is ${updatedVal}`)

}
async function verify(contractAddr, args){
	console.log("Verifying ...")
	try {
		await run("verify:verify", {
			address: contractAddr,
			constructor: args
		})
	}catch(err) {
		if(err.message.toLowerCase().includes("already verified")){
			console.log("Already Verified!")
		}else{
			console.log(err)
		}
	}
}
// `````````````````
main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.log(err),
		process.exit(1)
	})