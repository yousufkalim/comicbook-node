const cron = require('node-cron');
const moment = require('moment');
const ListedItems = require('../models/ListedItems');
const NFTs = require('../models/Nft');
const bids = require('../models/Bids');

cron.schedule('0 0 0 * * *', async () => {
  // for midnight 12'o clok '0 0 0 * * *'

  const date = moment().subtract(1, 'day');
  // eslint-disable-next-line no-console
  console.log('first', date);
  // Get all listed items with a duration greater than 0
  // const listedItems = await ListedItems.find({ duration: { $gt: new Date() } }).populate('bids');

  const listedItems = await ListedItems.find({ duration: { $gt: new Date() } }).populate({
    path: 'bids',
    model: bids, // Name of the model
  });
  // .populate({
  //   path: 'nft',
  //   model: NFTs, // Name of the model
  // });
  // eslint-disable-next-line no-console
  console.log('listedItems12', listedItems);

  for (const listedItem of listedItems) {
    const { bids, owner, method, nft } = listedItem;
    const nfts = await NFTs.findById(nft);
    // Check if the listed item's method is 'sell to high bidder'
    if (nfts.listed === false) {
      if (method === 'Sell to high bider') {
        // eslint-disable-next-line no-console
        console.log('Sell to high bider12');
        // Check if the listed item has bids
        // const bids = await NFTs.findById(bid);
        if (bids.length > 0) {
          // eslint-disable-next-line no-console
          console.log('first123', bids.length);
          // Sort the bids in descending order based on bid value
          bids.sort((a, b) => b.price - a.price);
          // eslint-disable-next-line no-console
          console.log(
            'first098',
            bids.sort((a, b) => b.price - a.price),
          );
          const highestBid = bids[0];
          // eslint-disable-next-line no-console
          console.log('first190', highestBid);

          const { userId, price } = highestBid;
          // eslint-disable-next-line no-console
          console.log('fdgvhbn', userId, price);
          // eslint-disable-next-line no-console
          console.log('nft', nft);
          // Check if the highest bid value is greater than or equal to the listed item's sell value
          if (price >= listedItem.price) {
            // Retrieve the NFT document associated with the nftId
            // console.log('jhnnjknjjnj', price, listedItem.price);
            // eslint-disable-next-line no-console
            console.log('nfts', nfts);
            const previousOwner = nfts.owner;
            const previousOwners = nfts.previousOwners;

            previousOwners.push(previousOwner);
            // eslint-disable-next-line no-console
            console.log('Owners', previousOwners);

            nfts.owner = userId; // Replace owner with the highest bidder's ID

            await nfts.save();
            // console.log('nfts', nft.name);
            // //not working from here
            // nfts.owner.push(userId);
            // nfts.previousOwners.push(owner);
            // console.log('owner');
            // await nft.save();
            // eslint-disable-next-line no-console
            //   console.log(nft);

            // Remove the listed item
            await NFTs.findByIdAndUpdate(nft, { listed: false }), // Update owner of NFT
              //   await ListedItems.findByIdAndUpdate({});
              // eslint-disable-next-line no-console
              console.log('Successful', ListedItems);
          }
        }
      } else if (method === 'Sell to recent bider') {
        // eslint-disable-next-line no-console
        console.log('Sell to recent bider');
        // Check if the listed item has bids
        if (bids.length > 0) {
          const recentBid = bids[bids.length - 1];
          const { userId } = recentBid;

          // Retrieve the NFT document associated with the nftId
          const nft = await NFTs.findById(nft);

          // Update the NFT owner and previous owner arrays
          nft.owner.push(userId);
          nft.previousOwners.push(owner);

          await nft.save();

          // Remove the listed item
          await NFTs.findByIdAndUpdate(nft, { listed: false });
          // await ListedItems.findByIdAndRemove(listedItem._id);
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('This NFT is already Sold Out');
    }
  }
});
