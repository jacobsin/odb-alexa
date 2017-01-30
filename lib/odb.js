'use strict';
const moment = require('moment');

function ODB() {}

ODB.prototype.getAudioData = function() {

    const today = moment();
    return {
        title: today.format('MMMM Do'),
        url: 'http://cdn.rbcintl.org/odb/zhy/zhy-odb-'+today.format('YYYY-MM-DD')+'.mp3'
    };
};

module.exports = ODB;