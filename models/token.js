const ***REMOVED*** name: projectId } = require('../package.json');
const crypto = require('crypto');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

let Token = module.exports;

Token.createToken = async function (user) ***REMOVED***
  let ref;
  do ***REMOVED***
    ref = db.collection('tokens').doc(crypto.randomBytes(16).toString('hex'));
***REMOVED*** while ((await ref.get()).exists);
  await ref.create(***REMOVED***
    user: user,
    token: ref.id,
    created: +new Date()
***REMOVED***);
  return ref;
};
// https://localhost/confirmation?token=4f76475eb4c0221d9139816fec452166
Token.activate = async function (token) ***REMOVED***
  let data = await db.collection('tokens').doc(token).get();
  if (!data.exists) return false;
  let user = data.get('user'), code;
  if ((await user.get()).get('verified')) throw new Error('Account already verified.');
  
  do ***REMOVED***
    code = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + ((~~(Math.random() * 9)) + 1);
    console.log('random -> ' + code);
***REMOVED*** while ((await db.collection('users').where('code', '==', code).get()).docs.length);

  await user.update(***REMOVED***
    verified: true,
    code: code,
***REMOVED***);

  await data.ref.delete();
  return true;
};