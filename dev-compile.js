#!/usr/bin/env node
const fs = require('fs');
const request = require('requestretry');

const targetFile = process.argv[2];
if (!targetFile) {
  console.error('Specify a name of file to be compiled.');
  process.exit(0);
}

const local = require(`./templates/${targetFile}/params`); // eslint-disable-line
const eventParam = {
  templateName: targetFile,
  templateParams: local,
  responseType: 'plain',
};
const headers = {
  'Content-Type': 'application/json',
};

const options = {
  url: 'http://localhost:3090/bizform',
  method: 'POST',
  headers,
  json: true,
  body: JSON.stringify(eventParam),
  maxAttempts: 10,
  retryDelay: 2000,
};

request(options, (err, response, body) => {
  // this callback will only be called when the request succeeded or after maxAttempts or on error
  if (response) {
    console.log(`The number of request attempts: ${response.attempts}`);
    fs.writeFile('index.html', body);
  } else if (err) {
    console.err(err);
  }
});
