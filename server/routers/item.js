const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Item } = require('../models/Item');

router.get('/', (req, res) => {
    Item.findOne({ _id: req.query._id }, (err, item) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            return res.status(200).json({
                success: true,
                item: item,
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

router.get('/list/all', (req, res) => {
    Item.find({}, (err, list) => {
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

module.exports = router;
