const express = require('express');
const router = express.Router();
const { Image } = require('../models/Image');

router.post('/', (req, res) => {
    const spawn = require('child_process').spawn;

    var process_cartoon = spawn('python3', [__dirname+'/photo2cartoon/test.py']);
    process_cartoon.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    process_cartoon.stderr.on('data', function(data){
        console.error(data.toString());
    });

    const image = new Image(req.body);

    image.save((err, imageInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

module.exports = router;
