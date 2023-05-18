const router = require('express').Router();
const listedItems = require('../controllers/listedItems');
const { validateListedItems, isValidated } = require('../middleware/validators');

router.get('/topRated', listedItems.topRated);

router.post('/', validateListedItems, isValidated, listedItems.create);

router.get('/get', listedItems.getListedItems);

router.get('/:listedItemId', listedItems.getById);
router.get('/', listedItems.getAll);

module.exports = router;
