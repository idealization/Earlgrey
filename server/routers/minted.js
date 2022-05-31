const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Item } = require('../models/Item');
const { Minted } = require('../models/Minted');

router.get('/', (req, res) => {
    Minted.findOne({ _id: req.query._id }, (err, item) => {
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
    const minted = new Minted(req.body);

    minted.save((err, mintedInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

router.get('/list', (req, res) => {
    Minted.find({ userFrom: req.query.userFrom }, (err, list) => {
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
