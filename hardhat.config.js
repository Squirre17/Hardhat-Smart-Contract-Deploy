require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.7",
// };
// 8:45:49
require("dotenv").config()
const RINKEBY_RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY = process.env.ETHERSCAN_API_KEY
require("./tasks/block-number")
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4
		}
	},
	solidity: "0.8.7",
	etherscan: {
		apiKey: API_KEY,
	}
	
};
task("accounts", "Prints the list of accounts", async () => {
	const accounts = await ethers.getSigners();
  
	for (const account of accounts) {
	  console.log(account.address);
	}
  });