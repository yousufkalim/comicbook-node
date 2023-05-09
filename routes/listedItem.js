const router = require('express').Router();
const listedItems = require('../controllers/listedItems');
const { validateListedItems, isValidated } = require('../middleware/validators');

// Create - NFT
router.post('/', validateListedItems, isValidated, listedItems.create);
router.post('/buy', listedItems.buy);
router.get('/:listedItemId', listedItems.getById);
router.get('/bidsByNft/:nftId', listedItems.getAllBidByNFT);

// Export
module.exports = router;
