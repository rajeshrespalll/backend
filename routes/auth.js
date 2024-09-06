const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/auth');
const router = express.Router();

// @route    POST api/auth/register
// @desc     Register a user
// @access   Public
router.post('/register', [
  body('name').not().isEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], registerUser);

// @route    POST api/auth/login
// @desc     Login user
// @access   Public
router.post('/login', [
  body('email').isEmail(),
  body('password').exists(),
], loginUser);

module.exports = router;