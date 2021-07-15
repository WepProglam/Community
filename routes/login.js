var express = require('express');
var router = express.Router();
const crypto=require('crypto');
const { setupMaster } = require('cluster');
var connection=require('../db');
var session=require('../session/cook');
var cookieVal=require('../session/cookie').cookie;
var cookieInit=require('../session/cookie').init;
var sendFunc=require("../session/send");
var crypt=require("../session/crypto");
const doAsync=require("../session/async");


/* GET login page. */
router.get('/', doAsync(async(req, res, next) => {
    await session.cookSalt().then((_)=>{
        console.log(cookieVal);
        sendFunc.sendRender(req,res,"/login");
        //cookieInit(req.cookies);
    })
}));

router.post('/', doAsync(async(req, res, next) => {
    if(req.body.id){
        connection.query('SELECT login_pw FROM LOGIN WHERE login_id = ? ',req.body.id,doAsync(async(err,rows,fields) => {
            if(rows == null){
                sendFunc.sendRedirect(req,res,'/login'); 
            }
            else{
                var cryptedPw = crypt.passwordCrypte(rows[0]['login_pw'],req.cookies['salt']);  //비번 암호화 + salt 암호화
                if(cryptedPw == req.body.pw){   //클라이언트 암호랑 비교
                    //cookieInit();
                    await session.cookSession(rows[0]['login_pw'],req.body.id).then((_)=>{
                        console.log("session 발급 완료");
                        sendFunc.sendRedirect(req,res,'../'); 
                    });   //session 값 발급
                    
                }
                else{
                    sendFunc.sendRedirect(req,res,'/login'); 
                }
            }
        }));
    }
    else{
        res.redirect('/login');
    }
}));

module.exports = router;
