const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');

router.get('/register', (req, res, next) => ***REMOVED***
  res.render('register.ejs');
});

router.get('/register/validemail', async function (req, res, next) ***REMOVED***
  try ***REMOVED***
    res.set(***REMOVED***
      'Cache-Control': 'no-store, must-revalidate'
***REMOVED***);
    let valid = await User.checkValidEmail(req.query.email);
    res.json(***REMOVED***alreadyUsed: !valid});
***REMOVED*** catch (e) ***REMOVED***
    console.log('check valid email error: ');
    console.log(e);
***REMOVED***
});

router.post('/register', async function (req, res, next) ***REMOVED***
  try ***REMOVED***
    let user = await User.createUser(req.body.email, req.body.password);
    await User.sendConfirmation(user, req.hostname);
***REMOVED*** catch (e) ***REMOVED***
    console.log(e);
    return next(new Error('Registration error: Please contact admin'));
***REMOVED***
  req.flash('success', 'Register success, please verify your email first.');
  res.redirect('/');
});

module.exports = router;