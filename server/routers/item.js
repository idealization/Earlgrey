const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Item } = require('../models/Item');

router.get('/', (req, res) => {
    Item.findOne({ userFrom: req.query.userFrom, createdAt: req.query.timestamp }, (err, item) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                list: item,
            });
        }
    });
});

router.post('/', (req, res) => {
    var fs = require('fs');

    fs.rename("client/public/cartoon_image.png", `client/public/${req.body.userFrom}_${req.body.createdAt}.png`.replace(/:/g,""), function(err) {
        if( err ) throw err;
        console.log('File Renamed!');
    });

    const item = new Item(req.body);

    item.save((err, itemInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

router.get('/list', (req, res) => {
    Item.find({ userFrom: req.query.userFrom }, (err, list) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                list: list,
            });
        }
    });
});

router.get('/user', (req, res) => {
    User.findOne({ _id: req.query.userFrom }, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                user: user,
            });
        }
    });
});

router.put('/flower', (req, res) => {
    User.findOneAndUpdate({ _id: req.body.userFrom }, {$inc: {flower: req.body.flower}}, {new: true}, (err, user) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                user: user,
            });
        }
    });
});

router.post('/voiceandword', (req, res) => {
    const spawn = require('child_process').spawn;

    var process_voice = spawn('python', [__dirname+'/audio_analysis/audio_analysis.py']);
    process_voice.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    process_voice.stderr.on('data', function(data){
        console.error(data.toString());
    });

    var process_text = spawn('python', [__dirname+'/text_analysis/text_analysis.py']);
    process_text.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    process_text.stderr.on('data', function(data){
        console.error(data.toString());
    });
})

router.get('/voice', (req, res) => {
    Voice.findOne({ userFrom: req.query.userFrom, createdAt: req.query.timestamp }, (err, voice) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                list: voice,
            });
        }
    });
});

router.get('/word', (req, res) => {
    Word.findOne({ userFrom: req.query.userFrom, createdAt: req.query.timestamp }, (err, word) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                list: word,
            });
        }
    });
});

module.exports = router;
