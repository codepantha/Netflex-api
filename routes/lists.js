const adminMiddleware = require('../middleware/adminMiddleware');
const { create, destroy } = require('../controllers/list');

const router = require('express').Router();

router.route('/').post(adminMiddleware, create);
router.route('/:id').delete(adminMiddleware, destroy);

module.exports = router;
