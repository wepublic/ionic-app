#!/usr/bin/env node

// Copy FCM icons

'use strict';

module.exports = function(context) {

    var filestocopy = [
        // Icons
        { "resources/android/fcm/drawable-hdpi-fcm_push_icon.png": "platforms/android/res/drawable-hdpi/fcm_push_icon.png"},
        { "resources/android/fcm/drawable-mdpi-fcm_push_icon.png": "platforms/android/res/drawable-mdpi/fcm_push_icon.png"},
        { "resources/android/fcm/drawable-xhdpi-fcm_push_icon.png": "platforms/android/res/drawable-xhdpi/fcm_push_icon.png"},
        { "resources/android/fcm/drawable-xxhdpi-fcm_push_icon.png": "platforms/android/res/drawable-xxhdpi/fcm_push_icon.png"},
        { "resources/android/fcm/drawable-xxxhdpi-fcm_push_icon.png": "platforms/android/res/drawable-xxxhdpi/fcm_push_icon.png"},
    ];

    var fs = require('fs');
    var path = require('path');

    // no need to configure below
    var rootdir = context.opts.projectRoot;

    filestocopy.forEach(function(obj) {
        Object.keys(obj).forEach(function(key) {
            var val = obj[key];
            var srcfile = path.join(rootdir, key);
            var destfile = path.join(rootdir, val);
            console.log("copying "+srcfile+" to "+destfile);
            var destdir = path.dirname(destfile);
            if (!fs.existsSync(destdir)) fs.mkdirSync(destdir);
            if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
                fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
            }
        });
    });
}