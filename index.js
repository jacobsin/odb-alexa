'use strict';
module.change_code = 1;
const Alexa = require('alexa-app');
const app = new Alexa.app('odb');
const ODB = require('./lib/odb');

app.launch(function(req, res) {
    var prompt = 'For daily devotional from Our Daily Bread. Tell me a date.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('startReading', {
        'slots': {
            'READINGDATE': 'AMAZON.DATE'
        },
        'utterances': ['{|start reading|read} {|daily bread} {|for} {-|READINGDATE}']
    }, function (req, res) {
        var readingDate = req.slot('READINGDATE');
        const odb = new ODB();
        const audioData = odb.getAudioData(readingDate);
        const prompt = 'Start reading Our Daily Bread for ' + audioData.title;
        res.say(prompt).audioPlayerPlay('REPLACE_ALL', audioData.url).send();
        return true;
    }
);

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;