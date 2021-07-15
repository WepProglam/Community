const crypto=require('crypto');
var cookieVal=require('./cookie').cookie;
var cookieInit=require('./cookie').init;
var connection=require('../db');

function cookSalt(salt=null){
    return new Promise(resolve => {
        if(salt != null){
            cookieVal.salt={
                "value":salt,
                "maxAge":1000*100 //10초
            };
        }
        else{
            crypto.randomBytes(32, (err, buf) =>    {
                var salt=buf.toString('base64').toString();
                cookieVal.salt={
                    "value":salt,
                    "maxAge":1000*100 //10초
                };
            });
        }
        resolve();
    })
    
    
}

function cookSession(dbPw,id){
    return new Promise(resolve => {
        crypto.randomBytes(32, (err, buf) =>    {
            var salt=buf.toString('base64').toString();
            var session=crypto.createHash('sha512').update(dbPw+salt).digest('hex');
            for(let i=0;i<1000;i++){
                session=crypto.createHash('sha512').update(session+salt).digest('hex');
            }
    
            cookieVal.sessionId={
                "value":session,
                "maxAge":1000*60*60 //1시간
            }
    
            console.log(cookieVal.sessionId["value"]);
            connection.query('UPDATE `login` SET sessionId = ?, salt = ? WHERE login_id = ?',[cookieVal.sessionId["value"],salt,id]);
            
            resolve({
                "value":session,
                "maxAge":1000*60*60 //1시간
            });
    
        });
       
    })
    
}

module.exports = {
    "cookSalt":cookSalt,
    "cookSession":cookSession
}