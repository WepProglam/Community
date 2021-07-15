
const crypto=require('crypto');


function passwordCrypte(dbPw,salt){
    var cryptedPw=crypto.createHash('sha512').update(dbPw+salt).digest('hex');

    for(let i=0;i<1000;i++){
        cryptedPw=crypto.createHash('sha512').update(cryptedPw+salt).digest('hex');
    }


    return cryptedPw;
}

module.exports = {
    "passwordCrypte":passwordCrypte
}
