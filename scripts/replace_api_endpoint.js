#!/usr/bin/env node

// Replace API endpoint
// Automatically replaces the API endpoint with the proxy URL
// for 'ionic cordova [build|run]'.

'use strict';
var fs = require('fs');


module.exports = function (context) {
  console.log("Replacing API endpoint with real URL...")
   
  fs.readFile('www/build/main.js', 'utf8', function(err, data) {
    if (err) return console.log(err);
  
    var result = data.replace('http://localhost:8100/api', 'https://api.wepublic.me/v1');
  
    fs.writeFile('www/build/main.js', result, function(err) {
      if (err) return console.log(err);
      console.log('API endpoint set to real URL');
    });
  });
};