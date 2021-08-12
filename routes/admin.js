const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');
const { google } = require('googleapis');
// const sheets = google.sheets(require('./token.json'));
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

router.get('/admin', async (req, res, next) => {
  try {
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');

    let users = (await db.collection('users').orderBy('id').get()).docs;
    res.render('admin/admin.ejs', { users });
  } catch (e) {
    return next(e);
  }
});

router.get('/user/:code', async (req, res, next) => {
  try {
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');
    if (req.params.code == 'ADMIN') return res.redirect('/admin')
    let user = (await db.collection('users')
      .where('code', '=', req.params.code)
      .get()).docs[0];
    res.render('admin/user.ejs', { user });
  } catch (e) {
    return next(e);
  }
});
router.post('/user', async (req, res, next) => {
  try {
    if (!req.user || !req.user.get('admin')) throw new Error('Login as admin first');
    // console.log(req.body);
    let lock = [];
    let status = [];
    let comment = [];
    let extra = [];
    let payment;
    for (let i = 1; i <= 5; i++) {
      lock[i-1] = (req.body['l' + i] == 'true');
      status[i-1] = (req.body['s' + i] || '');
      comment[i-1] = req.body['c' + i];
      if (i <= 2) extra[i-1] = req.body['x' + i] || '';
    }
    payment = req.body.payment || false;
    
    let user = (await db.collection('users')
      .where('code', '=', req.body.code)
      .get()).docs[0];

    // console.log(status);

    user.ref.update({ lock, status, comment, payment, extra });
    
    res.redirect('/admin');
  } catch (e) {
    console.error(e);
    res.send('not ok');
  }
});

module.exports = router;