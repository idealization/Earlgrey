const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Item } = require('../models/Item');
const { Minted } = require('../models/Minted');

router.get('/', (req, res) => {
    Minted.findOne({ _id: req.query._id }, (err, minted) => {
        User.findOne({ _id: minted.createdUser }, (err, createdUser) => {
            if (err) {
                return res.status(400).send(err);
            } else {
                User.findOne({ _id: minted.mintedUser }, (err, mintedUser) => {
                    if (err) {
                        return res.status(400).send(err);
                    } else {
                        return res.status(200).json({
                            success: true,
                            createdUserId: createdUser._id,
                            createdUser: createdUser.name,
                            createdAt: minted.createdAt,
                            mintedUser: mintedUser.name,
                            mintedAt: minted.mintedAt,
                            title: minted.title,
                            content: minted.content
                        });
                    }
                })
            }
        })
    });
});

router.post('/', (req, res) => {
    Item.findOneAndDelete({ _id: req.body._id }, (err, item) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            const minted = new Minted({
                createdUser: item.createdUser,
                createdAt: item.createdAt,
                mintedUser: req.body.mintedFrom,
                mintedAt: req.body.mintedAt,
                title: req.body.title,
                content: req.body.content
            });
        
            minted.save((err, mintedInfo) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                    success: true,
                });
            });
        }
    })
});

router.post('/item', (req, res) => {
    Minted.findOneAndDelete({ _id: req.body._id }, (err, minted) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            const item = new Item({
                userFrom: req.body.userFrom,
                createdUser: minted.createdUser,
                createdAt: minted.createdAt
            });
        
            item.save((err, itemInfo) => {
                if (err) return res.json({ success: false, err });
                return res.status(200).json({
                    success: true,
                });
            });
        }
    })
});

router.get('/list', (req, res) => {
    Minted.find({ }, (err, list) => {
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
