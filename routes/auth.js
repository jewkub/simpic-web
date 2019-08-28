const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const secret = require('../secret/secret.json');

router.use(session(***REMOVED***
  name: 'session',
  secret: secret.session,
  cookie: ***REMOVED***
    expires: new Date(2147483647000) // Tue, 19 Jan 2038 03:14:07 GMT
***REMOVED***,
  saveUninitialized: false,
  resave: true
}));

router.use(flash());

// Passport init
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(***REMOVED***
	usernameField: 'email',
}, async function (email, password, done) ***REMOVED***
	try ***REMOVED***
		let user = await User.getUserByEmail(email);
		if (!user) return done(null, false, ***REMOVED***message: 'Unknown email'});
		let result = await User.comparePassword(password, user.get('password'));
		// console.log('login!');
		// console.log(user);
		if (result) return done(null, user);
		return done(null, false, ***REMOVED***message: 'Wrong password'});
	} catch (e) ***REMOVED***
		return done(e, false);
	}
}));

passport.serializeUser(function (user, done) ***REMOVED***
	done(null, user.id);
});

passport.deserializeUser(async function (id, done) ***REMOVED***
	try ***REMOVED***
		let user = await User.getUserById(id);
		done(null, user);
		// done(null, id);
	} catch (e) ***REMOVED***
		done(e, null);
	}
});

// Endpoint to login
router.post('/login',
  passport.authenticate('local', ***REMOVED***
    successRedirect: '/',
    failureRedirect: '/',
    successFlash: 'ล็อกอินสำเร็จ',
    failureFlash: true
***REMOVED***)
);

// Endpoint to get current user
router.get('/user', function(req, res)***REMOVED***
	console.log(req.user);
  res.send(req.user);
})

// Endpoint to logout
router.get('/logout', function(req, res)***REMOVED***
  req.logout();
  req.flash('success', 'ออกจากระบบสำเร็จ')
  res.redirect('/');
  // console.log(req.user);
});

module.exports = router;