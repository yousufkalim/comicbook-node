const ethers = require('ethers');
const web3Modal = require('web3modal');
const { address, abi } = require('../../contract-abi/contratAbi.json');
// getting contract abi and address
const fetchContract = () => {
  ethers.Contract(address, abi);
};

// creating smart contract address instance

// eslint-disable-next-line consistent-return
const connectingWithSmartContract = async () => {
  try {
    // eslint-disable-next-line new-cap
    const web3modal = new web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

module.exports = connectingWithSmartContract;
