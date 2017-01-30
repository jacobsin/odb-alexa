'use strict';
const chai = require('chai');
const expect = chai.expect;
const lolex  = require('lolex');

const ODB = require('../lib/odb.js');
chai.config.includeStack = true;

describe('ODB', function () {
    const odb = new ODB();

    describe('#getAudioData', function () {
        context('with date', function() {
            before(function () {
                this.clock = lolex.install();
                this.clock.setSystemTime(new Date('2017-01-28'));
            });

            it('returns url for given date', function () {
                const data = odb.getAudioData('2017-01-27');
                expect(data.title).to.eq('January 27th');
                expect(data.url).to.eq('https://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-27-17.mp3');
            });

            after(function () {
                this.clock.uninstall();
            });
        });

        context('without date', function() {
            before(function () {
                this.clock = lolex.install();
                this.clock.setSystemTime(new Date('2017-01-28'));
            });

            it('returns url for today', function () {
                const data = odb.getAudioData();
                expect(data.title).to.eq('January 28th');
                expect(data.url).to.eq('https://dzxuyknqkmi1e.cloudfront.net/odb/2017/01/odb-01-28-17.mp3');
            });

            after(function () {
                this.clock.uninstall();
            });
        });
    })
});