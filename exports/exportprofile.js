const fs = require('fs');
const readline = require('readline');
const ***REMOVED*** google } = require('googleapis');
const ***REMOVED*** name: projectId } = require('../package.json');

const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore(***REMOVED***
  projectId: projectId,
});
const Storage = require('@google-cloud/storage');
const storage = new Storage(***REMOVED***
  projectId: projectId,
});
const bucket = storage.bucket('simc-web.appspot.com');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

async function main(auth) ***REMOVED***
  const sheets = google.sheets(***REMOVED***version: 'v4', auth});

  let cnt = 0, all = [];
  let query = datastore
    .createQuery('Users')
    .filter('done', '=', true);
  datastore
    .runQuery(query)
    .then(result => ***REMOVED***
      console.log(result[0].length);
      result[0].forEach(async function(user, i) ***REMOVED***
        // if(i > 20) return ;
        let query = datastore
          .createQuery('Evaluation')
          .filter('email', '=', user.email);
        let ans = await datastore.runQuery(query);
        ans = ans[0];
        let order = [];
        all[i] = order;
        // order[0] = ans.ans;
        if(!order[0]) order[0] = '[blank]';
        ans.forEach((e, i) => ***REMOVED***
          order[e.num] = e.ans;
          if(e.answerType == 'upload') order[e.num] = 'http://storage.googleapis.com/simc-web.appspot.com/' +  order[e.num];
    ***REMOVED***);
        order[0] = user.email;
        for(let i = 0; i <= 27; i++) ***REMOVED***
          if(order[i] == undefined || order[i] == '') order[i] = '[blank]';
    ***REMOVED***
        // console.log(order);
        /* setTimeout(() => ***REMOVED***
          let range = 'ข้อมูลน้อง!A4:BK4';
          sheets.spreadsheets.values.append(***REMOVED***
            spreadsheetId: '1SnewRSj1KnZYt9xio___8reHg4EUMENeiajMWJMV5o0',
            range: range,
            valueInputOption: 'RAW',
            insertDataOption: 'OVERWRITE',
            resource: ***REMOVED***
              range: range,
              majorDimension: 'ROWS',
              values: [
                order
              ]
        ***REMOVED***,
            auth: auth,
      ***REMOVED***, function(err, response) ***REMOVED***
            if (err) ***REMOVED***
              console.error(err);
              return;
        ***REMOVED***
      ***REMOVED***);
    ***REMOVED***, 1.15 * 1000 * (cnt++)); */
  ***REMOVED***);
      setTimeout(() => ***REMOVED***
        let range = 'ประเมินทุกคน!A4:AB4';
        sheets.spreadsheets.values.append(***REMOVED***
          spreadsheetId: '1SnewRSj1KnZYt9xio___8reHg4EUMENeiajMWJMV5o0',
          range: range,
          valueInputOption: 'RAW',
          insertDataOption: 'OVERWRITE',
          resource: ***REMOVED***
            range: range,
            majorDimension: 'ROWS',
            values: all
      ***REMOVED***,
          auth: auth,
    ***REMOVED***, function(err, response) ***REMOVED***
          if (err) ***REMOVED***
            console.error(err);
            return;
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***, 30 * 1000);
***REMOVED***)
    .catch(err => ***REMOVED***
      console.log(err);
***REMOVED***);
}

// ------------------------

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => ***REMOVED***
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