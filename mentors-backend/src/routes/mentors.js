const router = require('express').Router();
const { listMentors, listMentees, getMyMentorProfile, createMentorProfile, updateMentorProfile } = require('../controllers/mentorController');
const auth = require('../middlewares/authmiddleware');

router.get('/', listMentors);                        // public
router.get('/mentees', auth, listMentees);           // list mentees (for mentors)
router.get('/me', auth, getMyMentorProfile);         // get my mentor profile
router.post('/', auth, createMentorProfile);         // create mentor profile (setup)
router.put('/', auth, updateMentorProfile);          // update mentor profile

module.exports = router;
