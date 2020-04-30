const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { name: projectId } = require('../package.json');

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId,
  keyFilename: '../secret/simpic-web-f94582c3af8f.json',
});
const bucket = storage.bucket('simpic-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: '../secret/simpic-web-f94582c3af8f.json',
});

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

async function main(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  let dg = [], obs = [];
  let users = (await db.collection('users').orderBy('id').get()).docs;
  // users.forEach(async u => {
  for (let u of users) {
    if (u.get('code') == 'ADMIN') continue;
    let data = (await db.collection('form')
    .where('user', '=', u.ref)
    .get()).docs;
    for (let i = 1; i <= 5; i++) {
      let col = [u.get('id'), u.get('code'), u.get('email')], isobs = false;
      col[7] = i != 5 ? 'Contestant ' + i : 'Advisor';
      col[19] = u.get('payment');
      let extra = u.get('extra') || [];
      col[20] = extra[0] || '';
      col[21] = extra[1] || '';
      col[22] = extra[2] || '';

      data.forEach(e => {
        let field = e.get('field'), value = e.get('value');
        if (field == 'in1') col[3] = value;
        else if (field == 'in2') col[4] = value;
        else if (field == 'in3') col[5] = value;
        else if (field == 'in4' && value != 'others') col[6] = value;
        else if (field == 'in4-1' && value) col[6] = 'others: ' + value;

        else if (field == 'as') isobs = (value == 'observer');

        else if (field == 'c' + i + '-1') col[8] = value;
        else if (field == 'c' + i + '-2') col[9] = value;
        else if (field == 'c' + i + '-3') col[10] = value;
        else if (field == 'c' + i + '-4') col[11] = value;
        else if (field == 'c' + i + '-5') col[12] = value;
        else if (field == 'c' + i + '-6') col[13] = value;
        else if (field == 'c' + i + '-7' && value != 'others') col[14] = value;
        else if (field == 'c' + i + '-7-1' && value) col[14] = 'others: ' + value;
        else if (field == 'c' + i + '-8') col[15] = value;

        else if (field == 'f1') col[18] = 'https://storage.googleapis.com/simpic-web.appspot.com/' + value;
        else if (field == 'f2') col[17] = 'https://storage.googleapis.com/simpic-web.appspot.com/' + value;
        else if (field == 'f3') col[16] = 'https://storage.googleapis.com/simpic-web.appspot.com/' + value;
      });
      if (!isobs) dg.push(col);
      else obs.push(col);
    }
  };
  dg.push(['Last update', (new Date()).toString(), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  obs.push(['Last update', (new Date()).toString(), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  for (let i = dg.length; i < 297; i++) dg.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  for (let i = obs.length; i < 297; i++) obs.push(['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']);
  for (let i = 0; i < 297; i++) {
    for (let j = 0; j < 19; j++) {
      dg[i][j] = dg[i][j] || '';
      obs[i][j] = obs[i][j] || '';
    }
  }

  let range = 'DG!A3:W3000';
  sheets.spreadsheets.values.update({
    spreadsheetId: '1b_v12Koq3p3oS1gsId_wbXLCY4Xtcw0MNkreNN05Yok',
    range: range,
    valueInputOption: 'RAW',
    // insertDataOption: 'OVERWRITE',
    resource: {
      range: range,
      majorDimension: 'ROWS',
      values: dg
    },
    auth: auth,
  }, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
  });

  range = 'Observer!A3:W3000';
  sheets.spreadsheets.values.update({
    spreadsheetId: '1b_v12Koq3p3oS1gsId_wbXLCY4Xtcw0MNkreNN05Yok',
    range: range,
    valueInputOption: 'RAW',
    // insertDataOption: 'OVERWRITE',
    resource: {
      range: range,
      majorDimension: 'ROWS',
      values: obs
    },
    auth: auth,
  }, function (err, response) {
    if (err) {
      console.error(err);
      return;
    }
  });
}

// ------------------------

// Load client secrets from a local file.
fs.readFile('../secret/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), main);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}