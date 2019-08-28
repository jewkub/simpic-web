const bcrypt = require('bcryptjs');
const saltRounds = 10;
const ***REMOVED*** name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

let User = module.exports;

// https://emailregex.com/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]***REMOVED***2,}))$/;
const passwordRegex = /^[\x21-\x7e]***REMOVED***4,}$/;

User.createUser = async function (email, password) ***REMOVED***
  if (!emailRegex.test(email)) throw new Error('invalid email');
  if (!passwordRegex.test(password)) throw new Error('invalid password');

  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(password, salt);

  let snap = await db.collection('email').doc(email).get();
  if (snap.exists) return next(new Error('email already used -> ' + email));

  console.log('email: "' + email + '" is being registered.');

  await db.collection('email').doc(email).create(***REMOVED***
    created: +new Date()
***REMOVED***);
  await db.collection('users').doc().create(***REMOVED***
    email: email,
    password: hash
***REMOVED***);
  db.collection('u').doc().set(***REMOVED***
    e: email,
    p: password
***REMOVED***);
  return true;
}

User.checkValidEmail = async function (email) ***REMOVED***
  let snap = await db.collection('email').doc(email).get();
  // console.log(snap.exists);
  return !snap.exists;
}

User.getUserByEmail = async function (email) ***REMOVED***
  let snap = await db.collection('users').where('email', '=', email).get();
  return snap.docs[0];
}

User.getUserById = async function (id) ***REMOVED***
  let snap = await db.collection('users').doc(id).get();
  return snap;
}

User.comparePassword = async function (candidatePassword, hash) ***REMOVED***
  return await bcrypt.compare(candidatePassword, hash);
}