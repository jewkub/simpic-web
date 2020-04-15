const fs = require('fs');
const http = require('https');
const readline = require('readline');
const ***REMOVED*** google } = require('googleapis');
const ***REMOVED*** name: projectId } = require('../../package.json');

const ***REMOVED*** Storage } = require('@google-cloud/storage');
const storage = new Storage(***REMOVED***
  projectId,
  keyFilename: '../../secret/simpic-web-f94582c3af8f.json',
});
const bucket = storage.bucket('simpic-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: '../../secret/simpic-web-f94582c3af8f.json',
});

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

async function main(auth) ***REMOVED***
  const sheets = google.sheets(***REMOVED***version: 'v4', auth});

  sheets.spreadsheets.values.get(***REMOVED***
    spreadsheetId: '1b_v12Koq3p3oS1gsId_wbXLCY4Xtcw0MNkreNN05Yok',
    range: 'DG!Q3:Q1000',
***REMOVED***, async function(err, res) ***REMOVED***
    if (err) return console.log('The API returned an error: ' + err);
    console.log(res.data.values.length);
    res.data.values.forEach(async function(data, i) ***REMOVED***
      if(!data[0]) return;
      if (i%5) return ;
      const file = fs.createWriteStream('' + i + '.' + data[0].split('.').pop());
      const request = http.get(data[0], function(response) ***REMOVED***
        response.pipe(file);
  ***REMOVED***);
***REMOVED***);
***REMOVED***);
}

// ------------------------

// Load client secrets from a local file.
fs.readFile('../../secret/credentials.json', (err, content) => ***REMOVED***
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), main);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param ***REMOVED***Object} credentials The authorization client credentials.
 * @param ***REMOVED***function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) ***REMOVED***
  const ***REMOVED***client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => ***REMOVED***
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
***REMOVED***);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param ***REMOVED***google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param ***REMOVED***getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) ***REMOVED***
  const authUrl = oAuth2Client.generateAuthUrl(***REMOVED***
    access_type: 'offline',
    scope: SCOPES,
***REMOVED***);
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface(***REMOVED***
    input: process.stdin,
    output: process.stdout,
***REMOVED***);
  rl.question('Enter the code from that page here: ', (code) => ***REMOVED***
    rl.close();
    oAuth2Client.getToken(code, (err, token) => ***REMOVED***
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => ***REMOVED***
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
  ***REMOVED***);
      callback(oAuth2Client);
***REMOVED***);
***REMOVED***);
}