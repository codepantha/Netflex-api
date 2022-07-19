const { index, update, destroy, show } = require('../controllers/user');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = require('express').Router();

router.route('/').get(adminMiddleware, index);

router.route('/:id').get(show).patch(update).delete(destroy);

module.exports = router;
