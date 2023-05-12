const router = require('express').Router();
const listedItems = require('../controllers/listedItems');
// const { validateListedItems, isValidated } = require('../middleware/validators');

// // Create - NFT
router.post('/', listedItems.create);
router.get('/get', listedItems.getListedItems);

// // router.post('/buy', listedItems.buy);
router.get('/:listedItemId', listedItems.getById);
router.get('/', listedItems.getAll);
// router.get('/recommended', listedItems.recommended);
// // router.get('/bidsByNft/:nftId', listedItems.getAllBidByNFT);

// // Export
module.exports = router;
