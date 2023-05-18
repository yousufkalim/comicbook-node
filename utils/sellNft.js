const cron = require('node-cron');
const moment = require('moment');
const ListedItems = require('../models/ListedItems');
const NFTs = require('../models/Nft');
const bids = require('../models/Bids');
const sellNFT = require('../web3/contractFunction');

cron.schedule('0 0 0 * * *', async () => {
  // for midnight 12'o clok '0 0 0 * * *'
  const currentDate = moment().startOf('day');
  // const date = moment().subtract(1, 'day');
  // eslint-disable-next-line no-console
  console.log('first', currentDate);
  // Get all listed items with a duration greater than 0
  // const listedItems = await ListedItems.find({ duration: { $gt: new Date() } }).populate('bids');
  const listedItems = await ListedItems.find({ duration: currentDate }).populate({
    path: 'bids',
    model: bids,
  });
  // const listedItems = await ListedItems.find({ duration: { $gt: new Date() } }).populate({
  //   path: 'bids',
  //   model: bids, // Name of the model
  // });

  for (const listedItem of listedItems) {
    const { bids, method, nft, royalty } = listedItem;
    const nfts = await NFTs.findById(nft);
    // Check if the listed item's method is 'sell to high bidder'
    if (nfts.listed === true) {
      if (method === 'Sell to high bider') {
        // Check if the listed item has bids
        // const bids = await NFTs.findById(bid);
        if (bids.length > 0) {
          // Sort the bids in descending order based on bid value
          bids.sort((a, b) => b.price - a.price);
          const highestBid = bids[0];
          const { userId, price } = highestBid;

          // eslint-disable-next-line no-console
          console.log('price', userId);

          const royaltyPercentage = royalty;

          // Calculate royalty price
          const royaltyPrice = price * (royaltyPercentage / 100);

          // Deduct royalty from recent bid price
          const Originalprice = price - royaltyPrice;
          // eslint-disable-next-line no-console
          console.log('price', Originalprice);

          //Call the function

          await nfts.save();
          // await NFTs.findByIdAndUpdate(nft);

          // const previousOwner = nfts.owner;
          // const previousOwners = nfts.previousOwners;

          // previousOwners.push(previousOwner);

          // nfts.owner = userId; // Replace owner with the highest bidder's ID

          // await nfts.save();
          // // Remove the listed item
          // await NFTs.findByIdAndUpdate(nft, { listed: false }), // Update owner of NFT
          //   await ListedItems.findByIdAndUpdate({});
        }
      } else if (method === 'Sell to Recent bider') {
        // eslint-disable-next-line no-console
        console.log('Sell to Recent bidder');

        if (bids.length > 0) {
          const recentBid = bids[bids.length - 1]; // Select the most recent bid
          const { userId, price } = recentBid;
          // eslint-disable-next-line no-console
          console.log('User', userId);
          // const royaltyPercentage = royalty.royaltyPercentage;

          // Calculate royalty price
          const royaltyPercentage = price * (royalty / 100);

          // Deduct royalty from recent bid price
          const Originalprice = price - royaltyPercentage;
          // eslint-disable-next-line no-console
          console.log('Price', Originalprice);

          //Call the function  & required parameters tokinId, royalty, artist address
          await sellNFT();

          await nfts.save();
          // await NFTs.findByIdAndUpdate(nft)
          // const previousOwner = nfts.owner;
          // const previousOwners = nfts.previousOwners;

          // previousOwners.push(previousOwner);

          // nfts.owner = userId; // Replace owner with the recent bidder's ID // Remove the listed item and update owner of NFT
          // await NFTs.findByIdAndUpdate(nft, { listed: false }); // Remove the listed item and update owner of NFT
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
