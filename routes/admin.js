const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');
const ***REMOVED*** google } = require('googleapis');
const sheets = google.sheets(***REMOVED*** version: 'v4', auth: '***REMOVED***' });
const ***REMOVED*** name: projectId } = require('../package.json');

const Multer = require('multer');
const multer = Multer(***REMOVED***
  storage: Multer.MemoryStorage,
  limits: ***REMOVED***
    fileSize: 10 * 1024 * 1024 // no larger than 10mb
***REMOVED***
});

const ***REMOVED*** Storage } = require('@google-cloud/storage');
const storage = new Storage(***REMOVED***
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});
const bucket = storage.bucket('simpic-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

router.get('/admin', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');

    let users = (await db.collection('users').orderBy('id').get()).docs;
    res.render('admin/admin.ejs', ***REMOVED*** users });
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
});

router.get('/user/:code', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');
    if (req.params.code == 'ADMIN') return res.redirect('/admin')
    let user = (await db.collection('users')
      .where('code', '=', req.params.code)
      .get()).docs[0];
    res.render('admin/user.ejs', ***REMOVED*** user });
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
});
router.post('/user', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');
    // console.log(req.body);
    let lock = [];
    let status = [];
    let comment = [];
    let extra = [];
    let payment;
    for (let i = 1; i <= 4; i++) ***REMOVED***
      lock[i-1] = (req.body['l' + i] == 'true');
      status[i-1] = (req.body['s' + i] || '');
      comment[i-1] = req.body['c' + i];
      if (i != 4) extra[i-1] = req.body['x' + i] || '';
***REMOVED***
    payment = req.body.payment || false;
    
    let user = (await db.collection('users')
      .where('code', '=', req.body.code)
      .get()).docs[0];

    // console.log(status);

    user.ref.update(***REMOVED*** lock, status, comment, payment, extra });
    
    res.redirect('/admin');
***REMOVED*** catch (e) ***REMOVED***
    console.error(e);
    res.send('not ok');
***REMOVED***
});

module.exports = router;