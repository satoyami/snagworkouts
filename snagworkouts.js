const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');
const htmlparser = require("htmlparser2");
const wodurl = 'http://wodwell.com/wods/?category=5';

let domtree;

const handler = new htmlparser.DomHandler((error, dom) => {
  if (error) { throw error; }
  domtree = dom;
});

const parser = new htmlparser.Parser(handler,{decodeEntities: true});


function getWods(url) {
  return new Promise((resolve,reject) => {
    request(url, (err, res, body) => {
      if(err) { return reject(err); }
      return resolve(body);
    });
  })
}

getWods(wodurl).then(
  (result) => {
    parser.write(result);
    parser.end()
  }
).then(
  () => {
    console.log(domtree[3].children[3]);
  }
).catch(err => console.log(err));