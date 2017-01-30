'use strict';
module.change_code = 1;
const Alexa = require('alexa-app');
const app = new Alexa.app('odb');
const ODB = require('./lib/odb');

app.launch(function(req, res) {
    var prompt = 'For daily devotional from Our Daily Bread. Tell me a date.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('StartReading', {
        'slots': {
            'Date': 'AMAZON.DATE'
        },
        'utterances': ['{|start reading|read} {|daily bread} {|for} {-|Date}']
    }, function (req, res) {
        var date = req.slot('Date');
        const odb = new ODB();
        const audioData = odb.getAudioData(date);
        const prompt = 'Start reading Our Daily Bread for ' + audioData.title;
        res.say(prompt).audioPlayerPlayStream('REPLACE_ALL', {
            token: audioData.token,
            url : audioData.url,
            offsetInMilliseconds: 0
        });
    }
);

app.intent('AMAZON.PauseIntent', function(req, res) {
    res.audioPlayerStop();
});

app.intent('AMAZON.ResumeIntent', function(req, res) {
    res.audioPlayerPlayStream();
});

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function() {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;