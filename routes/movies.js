const { index, show, create, update, destroy, getRandomMovie } = require('../controllers/movie');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = require('express').Router();

router.route('/').get(adminMiddleware, index).post(adminMiddleware, create);
router.route('/random').get(getRandomMovie)
router.route('/:id').get(show).patch(adminMiddleware, update).delete(adminMiddleware, destroy);

module.exports = router;
