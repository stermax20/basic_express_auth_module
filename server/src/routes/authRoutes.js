const express = require('express');
const {
  register,
  login,
  refresh,
} = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');
const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.post('/refresh', refresh);

router.get('/authenticate', authenticateToken, (req, res) => {
  res.json({ message: 'Authenticated', user: req.user });
});

module.exports = router;