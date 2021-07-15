var express = require('express');
var router = express.Router();
const crypto=require('crypto');
var mysql=require('mysql');

var connection = require("../db");

router.get('/', function(req, res, next) {
    res.render('admin');
});



router.post('/', function(req, res, next) {    
    connection.query('SELECT login_id FROM LOGIN WHERE login_id = ? ',req.body.id,function(err,rows,fields){
        if(rows.length == 0){
            connection.query('INSERT into login (`login_id`,`login_pw`) values(?, ?)',[req.body.id,req.body.pw]);
            res.redirect("/login");
        }else{
            res.render('admin');
        }
    })
});

module.exports = router;