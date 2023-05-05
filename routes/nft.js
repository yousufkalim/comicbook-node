const router = require('express').Router();
const nft = require('../controllers/nft');
// const { checkAuth } = require('../middleware/checkAuth');
const { upload, uploadMedia } = require('../middleware/multer');
const { validateNft, isValidated } = require('../middleware/validators');

// Create - NFT
router.post('/', upload.single('doc'), validateNft, isValidated, nft.create);
router.get('/:userId', nft.getAllByUser);
router.get('/nftById/:nftId', nft.getById);
router.get('/', nft.getAll);

// Export
module.exports = router;
