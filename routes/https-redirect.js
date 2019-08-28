/**
* Create a middleware to redirect http requests to https
* @param ***REMOVED***Object} options Options
* @returns ***REMOVED***Function} The express middleware handler
*/
module.exports = function(options) ***REMOVED***
  options = options || ***REMOVED***};
  var httpsPort = options.httpsPort || 443;
  return function(req, res, next) ***REMOVED***
    if (req.protocol != 'https' && process.env.NODE_ENV == 'production') ***REMOVED***
      var parts = req.get('host').split(':');
      var host = parts[0] || '127.0.0.1';
      return res.redirect('https://' + host + ':' + httpsPort + req.url);
***REMOVED***
    next();
***REMOVED***;
};
// http://bit.ly/2LtHiRd