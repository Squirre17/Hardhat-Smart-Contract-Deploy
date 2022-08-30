require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter")
/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.7",
// };
// 8:45:49
require("dotenv").config()
const RINKEBY_RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP = process.env.COINMARKETCAP_API_KEY
require("./tasks/block-number")
require("solidity-coverage")
module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			// accounts : thanks hardhat
			chainId: 31337,// fixed
		}
	},
	solidity: "0.8.7",
	etherscan: {
		apiKey: API_KEY,
	},
	gasReporter: {
		enabled: false,
		outputFile: "gas-reporter.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP,
		token: "MATIC"
	}
	
};
task("accounts", "Prints the list of accounts", async () => {
	const accounts = await ethers.getSigners();
  
	for (const account of accounts) {
	  console.log(account.address);
	}
  });
// 9:45:05