const router = require('express').Router();
const listedItems = require('../controllers/listedItems');
const { validateListedItems, isValidated } = require('../middleware/validators');

// // Create - NFT
router.get('/topRated', listedItems.topRated);

router.post('/', validateListedItems, isValidated, listedItems.create);

router.get('/get', listedItems.getListedItems);

// // router.post('/buy', listedItems.buy);
router.get('/:listedItemId', listedItems.getById);
router.get('/', listedItems.getAll);
// // router.get('/bidsByNft/:nftId', listedItems.getAllBidByNFT);

// // Export
module.exports = router;
