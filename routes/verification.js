const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');

router.get('/confirmation', async (req, res, next) => {
  try {
    let result = await Token.activate(req.query.token);
    if (!result) throw new Error('Cannot verify');
  } catch (e) {
    return next(e);
  }
  req.flash('success', 'Verify success.');
  res.redirect('/');
});

router.get('/resend', async (req, res, next) => {
  res.render('resend.ejs');
});

router.post('/resend', async (req, res, next) => {
  try {
    let user = await User.getUserByEmail(req.body.email);
    if (!user) throw new Error('Invalid email');
    user = user.ref;
    await User.sendConfirmation(user, req.hostname);
  } catch (e) {
    return next(e);
  }
  req.flash('success', 'Resend verification email success.');
  res.redirect('/');
});

module.exports = router;