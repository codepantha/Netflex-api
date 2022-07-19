const { update } = require('../controllers/user');

const router = require('express').Router();

router.route('/:id').patch(update);

module.exports = router;