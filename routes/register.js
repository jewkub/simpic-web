const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');

router.get('/register', (req, res, next) => {
  res.render('register.ejs');
});

router.get('/register/validemail', async function (req, res, next) {
  try {
    res.set({
      'Cache-Control': 'no-store, must-revalidate'
    });
    let valid = await User.checkValidEmail(req.query.email);
    res.json({alreadyUsed: !valid});
  } catch (e) {
    console.log('check valid email error: ');
    console.log(e);
  }
});

router.post('/register', async function (req, res, next) {
  try {
    req.body.email = req.body.email.toLowerCase();
    let user = await User.createUser(req.body.email, req.body.password, req.body.locale);
    await User.sendConfirmation(user, req.hostname);
  } catch (e) {
    console.log(e);
    return next(new Error('Registration error: Please contact admin'));
  }
  req.flash('success', 'Register success, please verify your email first.');
  res.redirect('/');
});

module.exports = router;