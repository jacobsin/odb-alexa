'use strict';
module.change_code = 1;
const Alexa = require('alexa-app');
const app = new Alexa.app('odb');
const ODB = require('./lib/odb');

// app.error = console.error;

app.launch(function (req, res) {
    const prompt = 'For reading daily devotional from Our Daily Bread. Tell me a date to start reading.';
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('StartReading', {
        'slots': {
            'Date': 'AMAZON.DATE'
        },
        'utterances': ['{|start reading|read} {|daily bread} {|for} {-|Date}']
    }, function (req, res) {
        const date = req.slot('Date');
        const odb = new ODB();
        const audioData = odb.getAudioData(date);
        const prompt = 'Start reading Our Daily Bread for ' + audioData.title;
        res.say(prompt).audioPlayerPlayStream('REPLACE_ALL', {
            token: audioData.url,
            url: audioData.url,
            offsetInMilliseconds: 0
        });
    }
);

// app.audioPlayer('PlaybackStopped', function (event) {
//     console.log(JSON.stringify(event.data.request));
// });

app.intent('AMAZON.PauseIntent', function (req, res) {
    const prompt = 'For resume reading Our Daily Bread. Say resume.';
    res.audioPlayerStop().reprompt(prompt).shouldEndSession(false);
});

app.intent('AMAZON.ResumeIntent', function (req, res) {
    if (req.context.AudioPlayer.offsetInMilliseconds > 0 && req.context.AudioPlayer.playerActivity === 'STOPPED') {
        res.audioPlayerPlayStream('REPLACE_ALL', {
            token: req.context.AudioPlayer.token,
            url: req.context.AudioPlayer.token,
            offsetInMilliseconds: req.context.AudioPlayer.offsetInMilliseconds
        });
    }
});

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function () {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;