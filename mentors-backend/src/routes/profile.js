const router = require('express').Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middlewares/authmiddleware');

router.get('/', auth, getProfile);
router.put('/', auth, updateProfile);

module.exports = router;
