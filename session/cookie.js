let cookie={

};


function init(req,res,next){
    console.log("initi!!");
    
    return new Promise(resolve => {
        var clientCookie=req.cookies;
        for (item in clientCookie){
            cookie[item]={
                "value":null,
                "maxAge":0
            }
        }
        resolve();
    })
    
}

module.exports = {
    "cookie" : cookie,
    "init" : init
};