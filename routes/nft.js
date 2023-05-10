const router = require('express').Router();
const nft = require('../controllers/nft');
// const { checkAuth } = require('../middleware/checkAuth');
const { upload } = require('../middleware/multer');
const { validateRange, validateNft, isValidated } = require('../middleware/validators');

// Create - NFT
router.post('/', upload.single('doc'), validateNft, isValidated, nft.create);
router.get('/get', nft.getNfts);
// router.get('/getPrice', nft.price);
router.get('/', nft.getAll);
router.get('/:userId', nft.getAllByUser);
router.get('/range', validateRange, isValidated, nft.range);

// Export
module.exports = router;
