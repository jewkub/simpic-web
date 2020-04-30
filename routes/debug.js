const express = require('express');
const router = express.Router();
const { name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

//error test
router.get('/err', (req, res, next) => {
  next(new Error('eiei'));
});

// get session
router.get('/session', (req, res, next) => {
  console.log(req.session);
  next(new Error('don\'t come here!'));
});

router.get('/early', async (req, res, next) => {
  ['pannathorn0769@gmail.com',
'simpicfkuns@gmail.com',
'deborachai20@gmail.com',
'arifcbmc@gmail.com',
'atthaphon.ko@wu.ac.th',
'741205139@qq.com',
'roykurniawan72@gmail.com',
'timothyjordanp2013@yahoo.com',
'surapas80@gmail.com',
'yeva.rosana@ui.ac.id',
'aldiruby@gmail.com',
'dryan05123@gmail.com',
'jb_gun@hotmail.com',
'davidtamarayvalbuena@gmail.com',
'nisatamtam@gmail.com',
'916858880@qq.com',
'siscaifak123@gmail.com',
'bihonrainbow@gmail.com',].forEach(async e => {
    (await db.collection('users').where('email', '=', e).get()).docs[0].ref.update({
      type: 'early'
    });
  });
  res.redirect('/');
});

router.get('/regular', async (req, res, next) => {
  [
'kmhs.fk@ugm.ac.id',
'ryanleeyb@gmail.com',
'ssotharith.student@puthisastra.edu.kh',
'amscsingapore2019@gmail.com',
'Tomorn.n@pnu.ac.th',
'kelvinflorentino98@gmail.com',
'gegelvia@gmail.com',
'saumitraginodia@gmail.com',
'evaplesko33@gmail.com',
'fronger1998@gmail.com',
'worapat.lak@student.mahidol.edu',
'karenang1999@gmail.com',
'magudkup@hotmail.com',
'fasyaa@xlfutureleaders.com',
'andri.agustiandi10@gmail.com',
'ayuwaay@gmail.com',
'aniketgpandey@gmail.com',
'5914077@nmu.ac.th',
'chaisrisuw@gmail.com',
'thanapat_43176@hotmail.com',
'toon_krab@hotmail.com',
'vxavierah@gmail.com',
'anirut@g.swu.ac.th',
'sarahthelilsis@gmail.com',

'kewpidviii@gmail.com',
'armsuper_ps01@hotmail.com',
'nanakhairunnisa88@gmail.com',
'ssuraiya@usm.my',
].forEach(async e => {
    (await db.collection('users').where('email', '=', e).get()).docs[0].ref.update({
      type: 'regular'
    });
  });
  res.redirect('/');
});

router.get('/observer', async (req, res, next) => {
  ['komson_patho@hotmail.com',
'abdullah_micro49@yahoo.com',].forEach(async e => {
    (await db.collection('users').where('email', '=', e).get()).docs[0].ref.update({
      type: 'observer'
    });
  });
  res.redirect('/');
});

router.get('/email', (req, res, next) => {
  res.send(req.user.get('email'));
});

router.get('/new', async (req, res, next) => {
  /* for (let i = 1; i <= 59; i++) await db.collection('exam').doc().create({
    answerType: 'text',
    num: i,
    part: 1
  });
  await db.collection('exam').doc().create({
    answerType: 'upload',
    num: 60,
    part: 1
  });
  await db.collection('exam').doc().create({
    answerType: 'upload',
    num: 61,
    part: 1
  }); */

  res.send('ok');
});

module.exports = router;