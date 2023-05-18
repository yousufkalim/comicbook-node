const connectingWithSmartContract = require('./contract-instance');

// parameters of this fucntion are uint256 tokenId, uint256 royalty, address payable artist
const sellNFT = async (tokinId, royalty, artist) => {
  try {
    const sellInstance = await connectingWithSmartContract();
    // const listing = await sellInstance.getlistingprice();
    // // eslint-disable-next-line no-const-assign, no-unused-vars
    // listing = listing.toString();
    const transaction = await sellInstance.executeSale(tokinId, royalty, artist);
    await transaction.wait();
    return transaction;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('something went wrong while buying the nft', err);
  }
};

module.exports = sellNFT;
