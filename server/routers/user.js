const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
var wordchx = require('./wordchk_search');

router.get('/', (req, res) => {
    User.findOne({ _id: req.query._id }, (err, user) => {
        if (err) return res.status(403).json({ err });
        if (!user) {
            return res.status(400).json({
                message: '가입되지 않은 유저입니다.',
            });
        }

        return res.status(200).json({
            success: true,
            user: user
        });
    })
})

router.post('/register', (req, res) => {
    if (!req.body.firebaseId) {
        return res.status(200).json({
            success: false,
            message: '로그인되지 않았습니다.',
        });
    }

    User.findOne({ firebaseId: req.body.firebaseId }, (err, user) => {
        if (err) return res.status(200).json({ success: false, err });

        if (user) {
            return res.status(200).json({
                success: false,
                message: '이미 가입된 유저입니다.',
            });
        }

        const nickname = req.body.nickname;
        if (!nickname) return res.status(200).json({
            message: "닉네임을 입력해주세요."
        });
        if (wordchx.wordchk1(nickname) || wordchx.wordchk2(nickname)) {
            return res.status(200).json({
                message: "닉네임에 부적절한 표현이 있습니다."
            });
        }

        User.findOne({ nickname: req.body.nickname }, (err, user) => {
            if (err) return res.status(200).json({ success: false, err });

            if (user) {
                return res.status(200).json({
                    success: false,
                    message: '이미 존재하는 닉네임입니다.',
                });
            }

            const newUser = new User(req.body);
        
            newUser.save((err, userInfo) => {
                if (err) return res.status(200).json({ success: false, err });
    
                return res.status(200).json({
                    success: true,
                    user: userInfo
                });
            });
        })
    });
});

router.post('/login', (req, res) => {
    User.findOne({ firebaseId: req.body.firebaseId }, (err, user) => {
        if (err) return res.status(403).json({ success: false, err });
        
        if (!user) {
            return res.status(200).json({
                loginSuccess: false,
                message: '가입되지 않은 유저입니다.',
            });
        }

        return res.status(200).json({
            loginSuccess: true,
            user: user
        });
    });
});

module.exports = router;
