const mysql = require('mysql')
const express = require ('express');
const session = require ('express-session');
const path = require('path');


const app = express

// login route for user
app.route('/login')
    .get((req, res) => {
        res.render('login', loginContent);        
    })
    .post((req, res)) => {
        var username = req.body.username;
        var password = req.body.password;
    }

    User.findOne({where: { username: username} }).then(function (user) {
        if(!user) {
            res.redirect('/login');
        } else if (!user.validPassword(password)) {
            res.redirect('/login')
        } else {
            req.session.user.= user.dataValues;
            res.direct('/userPortal')
        }
    });

// UserPortal route 
    app.get('/userPortal', (req,res) => {
        if (req.session.user && req.cookies.user_id) {
            loginContent.loggedin = true;
            loginContent.username = req.sessions.user.username;
            loginContent.title = "You are offically logged in!"
            
            res.render('userPortal', loginContent);
        } else {
            res.redirect('/login');
        }
        });