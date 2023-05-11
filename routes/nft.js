const router = require('express').Router();
const nft = require('../controllers/nft');
// const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/multer');
const { validateNft, isValidated } = require('../middleware/validators');

// Create - NFT
router.post('/', upload.single('doc'), validateNft, isValidated, nft.create);
router.get('/get', nft.getNfts);
// router.get('/getPrice', nft.price);
router.get('/', nft.getAll);
router.get('/:userId', nft.getAllByUser);
router.get('/recommended', nft.recommended);

// Export
module.exports = router;
