const { name: projectId } = require('../package.json');
const crypto = require('crypto');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

let Token = module.exports;

Token.createToken = async function (user) {
  let ref;
  do {
    ref = db.collection('tokens').doc(crypto.randomBytes(16).toString('hex'));
  } while ((await ref.get()).exists);
  await ref.create({
    user: user,
    token: ref.id,
    created: +new Date()
  });
  return ref;
};
// https://localhost/confirmation?token=4f76475eb4c0221d9139816fec452166
Token.activate = async function (token) {
  let data = await db.collection('tokens').doc(token).get();
  if (!data.exists) return false;
  let user = data.get('user'), code;
  if ((await user.get()).get('verified')) throw new Error('Account already verified.');
  
  do {
    code = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + ((~~(Math.random() * 9)) + 1);
    console.log('random -> ' + code);
  } while ((await db.collection('users').where('code', '==', code).get()).docs.length);

  await user.update({
    verified: true,
    code: code,
  });

  await data.ref.delete();
  return true;
};