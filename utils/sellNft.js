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
    const { bids, method, nft } = listedItem;
    const nfts = await NFTs.findById(nft);
    // Check if the listed item's method is 'sell to high bidder'
    if (nfts.listed === true) {
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
            // eslint-disable-next-line no-console
            console.log('nfts', nfts);
            const previousOwner = nfts.owner;
            const previousOwners = nfts.previousOwners;

            previousOwners.push(previousOwner);
            // eslint-disable-next-line no-console
            console.log('Owners', previousOwners);

            nfts.owner = userId; // Replace owner with the highest bidder's ID

            await nfts.save();
            // Remove the listed item
            await NFTs.findByIdAndUpdate(nft, { listed: false }), // Update owner of NFT
              //   await ListedItems.findByIdAndUpdate({});
              // eslint-disable-next-line no-console
              console.log('Successful', ListedItems);
          }
        }
      } else if (method === 'Sell to Recent bider') {
        // eslint-disable-next-line no-console
        console.log('Sell to Recent bidder');

        if (bids.length > 0) {
          const recentBid = bids[bids.length - 1]; // Select the most recent bid
          // eslint-disable-next-line no-console
          console.log('recenttttt', recentBid);
          const { userId } = recentBid;
          // eslint-disable-next-line no-console
          console.log('recenttttt543', userId);

          const previousOwner = nfts.owner;
          const previousOwners = nfts.previousOwners;

          previousOwners.push(previousOwner);
          // eslint-disable-next-line no-console
          console.log('Owners', previousOwners);

          nfts.owner = userId; // Replace owner with the recent bidder's ID
          // eslint-disable-next-line no-console
          console.log('Owners', nfts.owner);

          await nfts.save();
          await NFTs.findByIdAndUpdate(nft, { listed: false }); // Remove the listed item and update owner of NFT
          // eslint-disable-next-line no-console
          console.log('Successful Recent', ListedItems);
        }
      }

      // if (method === 'Sell to Recent bider') {
      //   console.log('Sell to Recent bider');

      //   if (bids.length > 0) {
      //     bids.sort((a, b) => b.timestamp - a.timestamp); // Sort bids in descending order based on timestamp

      //     const recentBid = bids[0];
      //     const { userId, price } = recentBid;

      //     if (price >= listedItem.price) {
      //       const previousOwner = nfts.owner;
      //       const previousOwners = nfts.previousOwners;

      //       previousOwners.push(previousOwner);
      //       console.log('Owners', previousOwners);

      //       nfts.owner = userId; // Replace owner with the recent bidder's ID

      //       await nfts.save();
      //       await NFTs.findByIdAndUpdate(nft, { listed: false }); // Remove the listed item and update owner of NFT

      //       console.log('Successful', NFTs);
      //     }
      //   }
      // }

      // if (method === 'Sell to Recent bider') {
      //   // eslint-disable-next-line no-console
      //   console.log('Sell to recent bidersdfghjk');
      //   // Check if the listed item has bids
      //   const nft = await NFTs.findById(nft);
      //   console.log('recent', nft);
      //   if (bids.length > 0) {
      //     const recentBid = bids[bids.length - 1];
      //     console.log('bid', recentBid);
      //     const { userId } = recentBid;
      //     console.log('user', userId);
      //     // Retrieve the NFT document associated with the nftId

      //     // Update the NFT owner and previous owner arrays
      //     const previousOwner = nft.owner;
      //     const previousOwners = nft.previousOwners;
      //     previousOwners.push(previousOwner);
      //     nfts.owner = userId; // Replace owner with the highest bidder's ID

      //     await nfts.save();

      //     // Remove the listed item
      //     await NFTs.findByIdAndUpdate(nft, { listed: false });
      //     // await ListedItems.findByIdAndRemove(listedItem._id);
      //   }
      // }
    }
    // else {
    //   // eslint-disable-next-line no-console
    //   console.log('This NFT is already Sold Out');
    // }
  }
});
