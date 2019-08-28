const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

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
    await User.createUser(req.body.email, req.body.password);
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
  req.flash('success', 'สมัครเข้าค่ายสำเร็จ');
  res.redirect('/');
});

module.exports = router;