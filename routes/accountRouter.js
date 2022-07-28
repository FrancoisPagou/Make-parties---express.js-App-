const express = require('express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcrypt');

router.get('/signup', async (req, res) => {
    res.render('sign-up');
});

//Create
router.post('/signup', async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await models.User.create({...req.body, password});

    req.session.loggedIn = true;
    req.session.username = user.username;
    req.session.userId = user.id;

    res.redirect('/');
});

module.exports = router;