'use strict';
module.change_code = 1;
const moment = require('moment');

function ODB() {}

ODB.prototype.getAudioData = function() {

    const today = moment().startOf('day');
    return {
        title: today.format('MMMM Do'),
        token: String(today.unix()),
        // url: 'http://cdn.rbcintl.org/odb/zhy/zhy-odb-'+today.format('YYYY-MM-DD')+'.mp3'
        url: today.format('[https://dzxuyknqkmi1e.cloudfront.net/odb/]YYYY[/]MM[/odb-]MM-DD-YY[.mp3]')
    };
};

module.exports = ODB;