const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');

const wodurl = 'http://wodwell.com/wods';

function getWods(url) {
  return new Promise((resolve,reject) => {
    request.post({url: url, form: {sort: 'alphabetical', nf_ajax_query: true}}, (err, res, body) => {
      if(err) { return reject(err); }
      return resolve(body);
    });
  })
}

getWods(wodurl).then(
  (result) => {
    console.log(result);
  }
).catch(err => console.log(err));