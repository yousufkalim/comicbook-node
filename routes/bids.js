const router = require('express').Router();
const bids = require('../controllers/bids');
const { validateBids, isValidated } = require('../middleware/validators');

// Create a Bid
router.post('/', validateBids, isValidated, bids.create);
// router.get('/:listedItem', bids.getAllByNft);
// Export
module.exports = router;
