const fs = require('fs');
const readline = require('readline');
const store = require('node-persist');
const ***REMOVED*** google } = require('googleapis');
const ***REMOVED*** name: projectId } = require('../package.json');

const ***REMOVED*** Storage } = require('@google-cloud/storage');
const storage = new Storage(***REMOVED***
  projectId,
  keyFilename: '../secret/SIMC-Web-4d0cc28353fd.json',
});
const bucket = storage.bucket('simc-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore(***REMOVED***
  projectId,
  keyFilename: '../secret/SIMC-Web-4d0cc28353fd.json',
});

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

async function main(auth) ***REMOVED***
  await store.init();
  const sheets = google.sheets(***REMOVED***version: 'v4', auth});

  let cnt = 0;
  let done = (await db.collection('users')
    .where('done', '=', true).get()).docs;
  let data = [];
  done.forEach(async user => ***REMOVED***
    let ans = (await db.collection('answers')
      .where('part', '==', 3) // edit part
      .where('num', '=', 6) // edit num
      .where('email', '=', user.get('email'))
      .get()).docs[0];

    let res = await store.getItem(user.get('email') + '-3-6'); // edit part and num
    if (res) return console.log('email ' + user.get('email') + ' is duplicated');

    data.push([user.get('email'), ans.get('ans')]);
    
    store.setItem(user.get('email') + '-3-6', true); // edit part and num

***REMOVED***);
  setTimeout(() => ***REMOVED***
    let range = '3-6!A4:C4'; // edit part and cell
    sheets.spreadsheets.values.append(***REMOVED***
      spreadsheetId: '1m6ctqrTCkIuW7KOFogcmpaM56ekgXxkeBa4SxGlrQGw',
      range: range,
      valueInputOption: 'RAW',
      insertDataOption: 'OVERWRITE',
      resource: ***REMOVED***
        range: range,
        majorDimension: 'ROWS',
        values: data
  ***REMOVED***,
      auth: auth,
***REMOVED***, function(err, response) ***REMOVED***
      if (err) ***REMOVED***
        console.error(err);
        return;
  ***REMOVED***
***REMOVED***);
***REMOVED***, 5000);

  

  /* let query = datastore
    .createQuery('Users')
    .filter('done', '=', true);
  datastore
    .runQuery(query)
    .then(result => ***REMOVED***
      result[0].forEach(async function(user) ***REMOVED***
        let query = datastore
          .createQuery('Answers')
          .filter('part', '=', 4) // edit part
          .filter('num', '=', 6) // edit num
          .filter('email', '=', user.email);
        let res = await store.getItem(user.email + '-4-6'); // edit part and num
        if(res) ***REMOVED***
          console.log('email ' + user.email + ' is duplicated');
          return ;
    ***REMOVED***
        let ans = await datastore.runQuery(query);
        ans = ans[0][0];
        let desc = ans;
        query = datastore
          .createQuery('Answers')
          .filter('part', '=', 5) // *edit part
          .filter('num', '=', 6) // *edit num
          .filter('email', '=', user.email);
        ans = await datastore.runQuery(query);
        ans = ans[0][0]; 
        setTimeout(() => ***REMOVED***
          let range = '4-6!A4:C4'; // edit part and cell
          sheets.spreadsheets.values.append(***REMOVED***
            spreadsheetId: '19GMi6YGRCxeJRgIhl_OO6BTpAKTh6pcVcNeGWe8C878',
            range: range,
            valueInputOption: 'RAW',
            insertDataOption: 'OVERWRITE',
            resource: ***REMOVED***
              range: range,
              majorDimension: 'ROWS',
              values: [
                [user.email, desc.ans]
              ]
        ***REMOVED***,
            auth: auth,
      ***REMOVED***, function(err, response) ***REMOVED***
            if (err) ***REMOVED***
              console.error(err);
              return;
        ***REMOVED***
            store.setItem(user.email + '-4-6', true); // edit part and num
      ***REMOVED***);
    ***REMOVED***, 1.15 * 1000 * (cnt++));
  ***REMOVED***);
***REMOVED***)
    .catch(err => ***REMOVED***
      console.log(err);
***REMOVED***) */

  /* var request = ***REMOVED***
    // The ID of the spreadsheet to update.
    spreadsheetId: '19GMi6YGRCxeJRgIhl_OO6BTpAKTh6pcVcNeGWe8C878',  // TODO: Update placeholder value.

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: 'part2!A4:B4',  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'RAW',  // TODO: Update placeholder value.

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',  // TODO: Update placeholder value.

    resource: ***REMOVED***
      range: 'part2!A4:B4',
      majorDimension: 'ROWS',
      values: [
        ['aaas', '222']
      ]
***REMOVED***,

    auth: auth,
***REMOVED***;

  sheets.spreadsheets.values.append(request, function(err, response) ***REMOVED***
    if (err) ***REMOVED***
      console.error(err);
      return;
***REMOVED***
  
    // console.log(response);
***REMOVED***); */

  /* sheets.spreadsheets.values.get(***REMOVED***
    spreadsheetId: '19GMi6YGRCxeJRgIhl_OO6BTpAKTh6pcVcNeGWe8C878',
    range: 'Sheet2!:A',
***REMOVED***, (err, res) => ***REMOVED***
    if (err) return console.log('The API returned an error: ' + err);
    console.log(res.data.values);
***REMOVED***); */

  /*sheets.spreadsheets.batchUpdate(***REMOVED***
    spreadsheetId: '19GMi6YGRCxeJRgIhl_OO6BTpAKTh6pcVcNeGWe8C878',
    resource: ***REMOVED***
      requests: [***REMOVED***
        addSheet: ***REMOVED***
          properties: ***REMOVED***
            title: 'part3'
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***]
***REMOVED***
***REMOVED***, function(err, response) ***REMOVED***
    if (err) ***REMOVED***
      console.error(err);
      return;
***REMOVED***

    // TODO: Change code below to process the `response` object:
    console.log(response);
***REMOVED***); */
}

// ------------------------

// Load client secrets from a local file.
fs.readFile('../secret/credentials.json', (err, content) => ***REMOVED***
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