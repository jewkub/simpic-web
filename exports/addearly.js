const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Token = require('../models/token.js');
const { google } = require('googleapis');
const { name: projectId } = require('../package.json');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId,
  keyFilename: 'secret/simpic-web-f94582c3af8f.json',
});

[
  'W3',
  'M7',
  'K9',
  'Z3',
  'E3',
  'V3',
  'Z7',
  'D1',
  'M1',
  'H7',
  'P6',
  'S1',
  'X3',
  'M3',
  'E6',
  'O2',
  'C1',
  'E1',
  'V1',
].forEach(async (e, i) => {
  let team = (await db.collection('users').where('code', '=', e).get()).docs[0].ref;
  await team.update({
    type: 'early'
  });
});

[
  'Z9',
  'H5',
  'H4',
  'F3',
  'J2',
  'B9',
  'C8',
  'B2',
  'C2',
  'Z6',
  'J9',
  'Y9',
  'Z4',
  'T7',
  'E5',
  'U5',
  'Y8',
  'O6',
  'J7',
  'G4',
  'G6',
  'G1',
  'Q2',
  'W9',
  'T9',
  'H8',
  'D9',
  'G2',
  'I5',
  'V4',
  'L7',
  'R8',
  'N1',
  'Q5',
  'J5',
  'K1',
  'Q9',
  'S8',
  'P4',
  'O3',
  'T1',
  'P2',
  'F5',
  'U3',
  'T6',
  'I3',
  'T4',
  'N9',
  'L8',
  'A1',
  'D8',
  'E7',
  'T8',
  'P8',
  'Q6',
  'G8',
  'K5',
  'T3',
  'L1',
  'F6',
  'G9',
  'C7',
  'J6',
  'U1',
  'S5',
  'V2',
  'M9',
  'Y6',
  'R5',
].forEach(async (e, i) => {
  let team = (await db.collection('users').where('code', '=', e).get()).docs[0].ref;
  await team.update({
    type: 'regular'
  });
});