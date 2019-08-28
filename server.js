// const url = require('url');
const path = require('path');
// const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const request = require('request');
const User = require('./models/user.js');
const ***REMOVED*** name: projectId } = require('./package.json');

const secret = require(__dirname + '/secret/secret.json');

const flash = require('connect-flash');

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

/* const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: './secret/SIMC-Web-4d0cc28353fd.json',
}); */

app.engine('html', require('ejs').renderFile);

const port = process.env.PORT || 8080, ip = process.env.IP || '0.0.0.0';

// set up routes
app.use(require(__dirname + '/routes/https-redirect.js')(***REMOVED*** httpsPort: app.get('https-port') }));
app.set('trust proxy', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(***REMOVED*** extended: false }));
// parse application/json
app.use(bodyParser.json());

// set no cache
app.use(function (req, res, next) ***REMOVED***
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(flash());

app.use('/', require('./routes/auth.js'));

// gzip
/* app.get('*.js', function (req, res, next) ***REMOVED***
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.get('*.css', function (req, res, next) ***REMOVED***
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
}); // https://stackoverflow.com/a/43711064/4468834 */

// real routes

app.get('/', async (req, res, next) => ***REMOVED***
  try ***REMOVED***
    let alert = req.flash();
    let pic = await bucket.getFiles(***REMOVED*** prefix: 'public/images/' });
    let spon = await bucket.getFiles(***REMOVED*** prefix: 'public/sponsors/' });
    // res.json(pic[0][0]);
    res.render('home.ejs', ***REMOVED*** files: pic[0], sponsors: spon[0], alert: alert });
***REMOVED*** catch (e) ***REMOVED***
    return next(e);
***REMOVED***
});

app.get('/upload', (req, res) => ***REMOVED***
  res.render('upload.ejs');
});
app.post('/upload', multer.any(), (req, res, next) => ***REMOVED***
  req.files.forEach(e => ***REMOVED***
    let ext = e.originalname.split('.').slice(-1)[0];
    // const gcspath = 'answers/' + req.body.part + '/' + e.fieldname + '/' + req.user.get('email') + '-' + Date.now() + '.' + ext;
    const gcspath = req.body.path + e.originalname
    if (!gcspath) return ;
    req.body[e.fieldname] = gcspath;
    const file = bucket.file(gcspath);

    const stream = file.createWriteStream(***REMOVED***
      metadata: ***REMOVED***
        contentType: e.mimetype
  ***REMOVED***,
      resumable: false
***REMOVED***);

    stream.on('error', (err) => ***REMOVED***
      e.cloudStorageError = err;
      next(err);
***REMOVED***);

    stream.on('finish', () => ***REMOVED***
      e.cloudStorageObject = gcspath;
      file.makePublic();
***REMOVED***);

    stream.end(e.buffer);
***REMOVED***);
  res.send('ok');
});

app.get(/^\/(registration|competition|accommodation|activities)$/, (req, res, next) => ***REMOVED***
  // console.log(req.params);
  res.render('information/' + req.params[0] + '.ejs');
});
app.get('/hof', (req, res) => ***REMOVED***
  res.render('hof.ejs');
});

app.use('/', require('./routes/debug.js'));
app.use('/', require('./routes/register.js'));
/* app.use('/', require('./routes/exam.js'));
app.use('/', require('./routes/evaluation.js'));
app.use('/', require('./routes/scoreboard.js')); */

// set normal cache
/* app.use(function(req, res, next) ***REMOVED***
  res.set('Cache-Control', 'public');
  next();
}); */

app.get('/favicon.ico', (req, res) => ***REMOVED***
  res.sendFile(__dirname + '/favicon.ico');
});

app.use(express.static('public'));
/* app.use(express.static('dist'));
app.use(express.static('views')); */

// 404
app.use((req, res, next) => ***REMOVED***
  res.status(404);

  // respond with html page
  if (req.accepts('html')) res.render('404.ejs', ***REMOVED*** url: req.url });

  // respond with json
  else if (req.accepts('json')) res.send(***REMOVED*** error: 'Not found' });

  // default to plain-text. send()
  else res.type('txt').send('Not found');
}); // http://bit.ly/2O01RDa

app.use((err, req, res, next) => ***REMOVED***
  console.error(err);
  req.flash('error', err.message);
  res.redirect('/');
});

app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));

module.exports = app;
