const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
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
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

router.post('/register/google', (req, res) => {
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

        const name = req.body.name;
        if (!name) return res.status(200).json({
            message: "이름을 입력해주세요."
        });
        if (wordchx.wordchk1(name) || wordchx.wordchk2(name)) {
            return res.status(200).json({
                message: "이름에 부적절한 표현이 있습니다."
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
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 유저가 없습니다.',
            });
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

router.post('/login/google', (req, res) => {
    User.findOne({ firebaseId: req.body.firebaseId }, (err, user) => {
        if (err) return res.status(403).json({ success: false, err });
        
        if (!user) {
            return res.status(200).json({
                loginSuccess: false,
                message: '가입되지 않은 유저입니다.',
            });
        }

        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
        });
    });
});

router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
        });
    });
});

module.exports = router;
