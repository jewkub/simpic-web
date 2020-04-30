const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');
const { google } = require('googleapis');
const { name: projectId } = require('../package.json');

const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // no larger than 10mb
  }
});

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});
const bucket = storage.bucket('simpic-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

router.get('/status', async (req, res, next) => {
  if (!req.user) return res.redirect('/register');
  if (req.user.get('admin')) return res.redirect('/admin');
  
  res.render('form/status.ejs', { user: req.user });
});

router.get('/application', async (req, res, next) => {
  if (!req.user) return res.redirect('/register');
  if (req.user.get('admin')) return res.redirect('/admin');

  let form = (await db.collection('form')
    .where('user', '=', req.user.ref)
    .get())
    .docs;
  let files = (await bucket.getFiles({ prefix: 'form' }))[0];
  // console.log(files);
  res.render('form/application.ejs', { user: req.user, form, files });
});
router.post('/application', async (req, res, next) => {
  let f1 = (await db.collection('form').where('user', '=', req.user.ref).where('field', '=', 'f1').get()).docs;
  let f2 = (await db.collection('form').where('user', '=', req.user.ref).where('field', '=', 'f2').get()).docs;
  let f3 = (await db.collection('form').where('user', '=', req.user.ref).where('field', '=', 'f3').get()).docs;
  let status = ['Submitted', 'Not submitted', 'Not submitted', 'Not submitted'];
  if (f1.length) status[1] = 'Submitted';
  if (f2.length) status[2] = 'Submitted';
  if (f3.length) status[3] = 'Submitted';
  await req.user.ref.update({
    lock: [true, true, true, true],
    status
  });
  res.redirect('/status');
});



router.post('/update', multer.any(), async (req, res, next) => {
  try {
    if (!req.user) throw new Error('No login data');

    let lock = req.user.get('lock') || [];
    if (lock[1] && req.body.field == 'f1') return ;
    if (lock[2] && req.body.field == 'f2') return ;
    if (lock[3] && req.body.field == 'f3') return ;
    if (lock[0] && req.body.field.charAt(0) != 'f') return ;

    // console.log(req.body);
    req.files.forEach(e => {
      // console.log(e);
      let ext = e.originalname.split('.').slice(-1)[0];
      const gcspath = 'form/' + req.user.get('email') + '-' + Date.now() + '.' + ext;
      req.body[e.fieldname] = gcspath;
      const file = bucket.file(gcspath);
  
      const stream = file.createWriteStream({
        metadata: {
          contentType: e.mimetype
        },
        resumable: false
      });
  
      stream.on('error', (err) => {
        e.cloudStorageError = err;
        next(err);
      });
  
      stream.on('finish', () => {
        e.cloudStorageObject = gcspath;
        file.makePublic();
      });
  
      stream.end(e.buffer);
    });

    let ans = await db
      .collection('form')
      .where('user', '=', req.user.ref)
      .where('field', '=', req.body.field).get();
    if (ans.empty) {
      await db.collection('form').doc().create({
        user: req.user.ref,
        field: req.body.field,
        value: req.body.value,
        type: req.body.type,
        email: req.user.get('email')
      });
    }
    else {
      if (ans.size > 1) {
        console.log('duplicate answer :(');
        console.log(req.user.get('email'));
        ans.docs.splice(1).forEach(async e => {
          await e.ref.delete();
        });
      }
      await ans.docs[0].ref.update({
        value: req.body.value,
      });
    }

    res.send('ok');
  } catch (e) {
    console.error(e);
    res.send('not ok');
  }
});

module.exports = router;