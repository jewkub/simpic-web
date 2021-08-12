const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const { name: projectId } = require('../package.json');

const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId,
  keyFilename: 'secret/simpic-web-f94582c3af8f.json',
});
const bucket = storage.bucket('simpic-web.appspot.com');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: 'secret/simpic-web-f94582c3af8f.json',
});

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

const crypto = require('crypto');
const genpass = () => new Promise((res, rej) => {
  crypto.randomBytes(5, function(err, buffer) {
    if (err) return rej(err);
    var token = buffer.toString('hex');
    res(token);
  });
});

async function main(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  let dg = [];
  let users = (await db.collection('users').orderBy('id').get()).docs;
  // users.forEach(async u => {
  for (let u of users) {
    if (u.get('code') == 'ADMIN') continue;
    let data = (await db.collection('form')
    .where('user', '=', u.ref)
    .get()).docs;
    if (!u.get('type')) continue;
    let col = [u.get('code'), u.get('email'), await genpass(), u.get('type')];

    data.forEach(e => {
      let field = e.get('field'), value = e.get('value');
      if (field == 'in1') col[4] = value;
      // else if (field == 'in2') col[4] = value;
      else if (field == 'country') col[5] = value;
      /* else if (field == 'in4' && value != 'others') col[6] = value;
      else if (field == 'in4-1' && value) col[6] = 'others: ' + value; */

      // else if (field == 'place') col[8] = value;

      else if (field == 'c1-1') col[6] = value;
    });
    dg.push(col);
  };

  let range = 'Sheet1!A3:Z3000';
  sheets.spreadsheets.values.update({
    spreadsheetId: '1P0VVHsEeahahR6jAAvVicw06s1FzChWRogCgvtgMKtI',
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
}

// ------------------------

// Load client secrets from a local file.
fs.readFile('secret/credentials.json', (err, content) => {
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