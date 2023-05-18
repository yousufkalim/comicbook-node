const router = require('express').Router();
const nft = require('../controllers/nft');
const { upload } = require('../middleware/multer');
const { validateNft, isValidated } = require('../middleware/validators');

// Create - NFT
router.post('/', upload.single('doc'), validateNft, isValidated, nft.create);
router.get('/get', nft.getNfts);
router.get('/', nft.getAll);
router.get('/:userId', nft.getAllByUser);
router.put('/:nftId', nft.update);
// Export
module.exports = router;
