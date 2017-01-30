'use strict';
const chai = require('chai');
const expect = chai.expect;
const lolex  = require('lolex');

const ODB = require('../lib/odb.js');
chai.config.includeStack = true;

describe('ODB', function () {
    const odb = new ODB();

    describe('#getAudioData', function () {
        context('without date', function() {
            before(function () {
                this.clock = lolex.install();
                this.clock.setSystemTime(new Date('2017-01-28'));
            });

            it('returns url for today', function () {
                const data = odb.getAudioData();
                expect(data.title).to.eq('January 28th');
                expect(data.url).to.eq('http://cdn.rbcintl.org/odb/zhy/zhy-odb-2017-01-28.mp3');
            });

            after(function () {
                this.clock.uninstall();
            });
        });
    })
});