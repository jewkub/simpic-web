const express = require('express');
const router = express.Router();
const ***REMOVED*** name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/SIMC-Web-4d0cc28353fd.json',
});

//error test
router.get('/err', (req, res, next) => ***REMOVED***
  next(new Error('eiei'));
});

// get session
router.get('/session', (req, res, next) => ***REMOVED***
  console.log(req.session);
  next(new Error('don\'t come here!'));
});

router.get('/email', (req, res, next) => ***REMOVED***
  res.send(req.user.get('email'));
});

router.get('/new', async (req, res, next) => ***REMOVED***
  /* for (let i = 1; i <= 59; i++) await db.collection('exam').doc().create(***REMOVED***
    answerType: 'text',
    num: i,
    part: 1
***REMOVED***);
  await db.collection('exam').doc().create(***REMOVED***
    answerType: 'upload',
    num: 60,
    part: 1
***REMOVED***);
  await db.collection('exam').doc().create(***REMOVED***
    answerType: 'upload',
    num: 61,
    part: 1
***REMOVED***); */

  res.send('ok');
});

module.exports = router;