const router = require('express').Router();
const { listMentors } = require('../controllers/mentorController');
const auth = require('../middlewares/authmiddleware');

router.get('/', listMentors);            // public
router.get('/me', auth, async (req,res)=> { /* return current user's profile */ });

module.exports = router;
