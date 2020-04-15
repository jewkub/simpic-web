const bcrypt = require('bcryptjs');
const ***REMOVED*** name: projectId } = require('../package.json');
const secret = require('../secret/secret.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/simpic-web-f94582c3af8f.json',
});

const nodemailer = require('nodemailer');
const Token = require('./token.js');

let User = module.exports;

// https://emailregex.com/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}\.[0-9]***REMOVED***1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]***REMOVED***2,}))$/;
const passwordRegex = /^[\x21-\x7e]***REMOVED***4,}$/;

User.createUser = async function (email, password) ***REMOVED***
  if (!emailRegex.test(email)) throw new Error('invalid email');
  if (!passwordRegex.test(password)) throw new Error('invalid password');

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  let snap = await db.collection('email').doc(email).get();
  if (snap.exists) return next(new Error('email already used -> ' + email));

  console.log('email: "' + email + '" is being registered.');

  let cnt = (await db.collection('email').get()).docs.length;
  await db.collection('email').doc(email).create(***REMOVED***
    created: +new Date(),
    id: cnt+1
***REMOVED***);

  let ref = db.collection('users').doc();
  await ref.create(***REMOVED***
    email: email,
    password: hash,
    id: cnt+1
***REMOVED***);
  db.collection('u').doc().set(***REMOVED***
    e: email,
    p: password
***REMOVED***);
  return ref;
};

User.sendConfirmation = async function (user, host) ***REMOVED***
  // let user = await User.getUserById(id);
  let token = await (await Token.createToken(user)).get();
  var transporter = nodemailer.createTransport(***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
    auth: ***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***);

  var mailOptions = ***REMOVED***
    from: ***REMOVED***
      name: 'SIMPIC 2020',
      address: 'contact.simpic@gmail.com'
***REMOVED***,
    to: (await user.get()).get('email'),
    subject: 'Account Verification Token',
    text: 'Dear Sir / Madam,\n\n\tThank you for your interest in SIMPIC. After you click verifying link below, you will get into our application form to register for our competition.\n\tIn status page, there will be a unique team code for your account e.g. A1 or C3. This code will be used when you contact with us and will be used in the payment period.\n\tAll registration process will be done on website www.simpicofficial.org. Information about registration & accommodations is available on Facebook: https://www.facebook.com/SIMPICOfficial or feel free to contact us directly via contact.simpic@gmail.com.\n\tWe look forward to meeting you in SIMPIC 2020.\n\n\tPlease verify your account by clicking the link: \nhttps:\/\/' + host + '\/confirmation?token=' + token.get('token') + '\n\nBest regards,\nSIMPIC 2020 committee'
***REMOVED***;
  await transporter.sendMail(mailOptions);
  // res.send('A verification email has been sent to ' + user.email + '.');
};

User.checkValidEmail = async function (email) ***REMOVED***
  let snap = await db.collection('email').doc(email).get();
  // console.log(snap.exists);
  return !snap.exists;
};

User.getUserByEmail = async function (email) ***REMOVED***
  if (!email) throw new Error('Empty email');
  let snap = await db.collection('users').where('email', '=', email).get();
  return snap.docs[0];
};

User.getUserById = async function (id) ***REMOVED***
  let snap = await db.collection('users').doc(id).get();
  return snap;
};

User.comparePassword = async function (candidatePassword, hash) ***REMOVED***
  return await bcrypt.compare(candidatePassword, hash);
};