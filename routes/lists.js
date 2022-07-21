const adminMiddleware = require('../middleware/adminMiddleware');
const { index, create, destroy } = require('../controllers/list');

const router = require('express').Router();

router.route('/').get(index).post(adminMiddleware, create);
router.route('/:id').delete(adminMiddleware, destroy);

module.exports = router;
