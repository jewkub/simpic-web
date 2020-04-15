// const url = require('url');
const path = require('path');
// const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const request = require('request');
const User = require('./models/user.js');
const { name: projectId } = require('./package.json');

const secret = require(__dirname + '/secret/secret.json');

const flash = require('connect-flash');

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

/* const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: './secret/SIMC-Web-4d0cc28353fd.json',
}); */

app.locals.addSlashes = function (str) {
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}; // https://stackoverflow.com/a/770533/4468834

app.engine('html', require('ejs').renderFile);

const port = process.env.PORT || 8080, ip = process.env.IP || '0.0.0.0';

// set up routes
app.use(require(__dirname + '/routes/https-redirect.js')({ httpsPort: app.get('https-port') }));
app.set('trust proxy', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set no cache
app.use(function (req, res, next) {
  // console.log(req.body);
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(flash());

app.use('/', require('./routes/auth.js'));

// gzip
/* app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.get('*.css', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
}); // https://stackoverflow.com/a/43711064/4468834 */

// real routes

app.get('/', async (req, res, next) => {
  try {
    let alert = req.flash();
    let pic = await bucket.getFiles({ prefix: 'public/images/' });
    let spon = await bucket.getFiles({ prefix: 'public/sponsors/' });
    // res.json(pic[0][0]);
    res.render('home.ejs', { files: pic[0], sponsors: spon[0], alert: alert });
  } catch (e) {
    return next(e);
  }
});

app.get('/upload', (req, res) => {
  res.render('upload.ejs');
});
app.post('/upload', multer.any(), (req, res, next) => {
  req.files.forEach(e => {
    let ext = e.originalname.split('.').slice(-1)[0];
    // const gcspath = 'answers/' + req.body.part + '/' + e.fieldname + '/' + req.user.get('email') + '-' + Date.now() + '.' + ext;
    const gcspath = req.body.path + e.originalname
    if (!gcspath) return ;
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
  res.send('ok');
});

app.get(/^\/(registration|competition|accommodation|activities)$/, (req, res, next) => {
  // console.log(req.params);
  res.render('information/' + req.params[0] + '.ejs');
});
app.get('/reviews', (req, res) => {
  res.render('reviews.ejs');
});
app.get('/hof', (req, res) => {
  res.render('hof.ejs');
});

app.use('/', require('./routes/debug.js'));
app.use('/', require('./routes/register.js'));
app.use('/', require('./routes/verification.js'));
app.use('/', require('./routes/form.js'));
app.use('/', require('./routes/admin.js'));

// set normal cache
app.use(function(req, res, next) {
  res.set('Cache-Control', 'public');
  next();
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/favicon.ico');
});

app.use(express.static('public'));
/* app.use(express.static('dist'));
app.use(express.static('views')); */

// 404
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) res.render('404.ejs', { url: req.url });

  // respond with json
  else if (req.accepts('json')) res.send({ error: 'Not found' });

  // default to plain-text. send()
  else res.type('txt').send('Not found');
}); // http://bit.ly/2O01RDa

app.use((err, req, res, next) => {
  console.error(err);
  req.flash('error', err.message);
  res.redirect('/');
});

app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));

module.exports = app;