const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');

router.get('/confirmation', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    let result = await Token.activate(req.query.token);
    if (!result) throw new Error('Cannot verify');
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
  req.flash('success', 'Verify success.');
  res.redirect('/');
});

router.get('/resend', async (req, res, next) => ***REMOVED***
  res.render('resend.ejs');
});

router.post('/resend', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    let user = await User.getUserByEmail(req.body.email);
    if (!user) throw new Error('Invalid email');
    user = user.ref;
    await User.sendConfirmation(user, req.hostname);
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
  req.flash('success', 'Resend verification email success.');
  res.redirect('/');
});

module.exports = router;