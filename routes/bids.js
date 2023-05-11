const router = require('express').Router();
const bids = require('../controllers/bids');
const { validateBids, isValidated } = require('../middleware/validators');

// Create a Bid
router.post('/', validateBids, isValidated, bids.create);
router.get('/nft/:nftId', bids.getBidsByNft);
router.get('/bid/:bidId', bids.getById); // Get one user by it's id

// router.get('/:listedItem', bids.getAllByNft);
// Export
module.exports = router;
