var cookieVal=require("./cookie").cookie;
var path=require('path');

function sendRender(req,res,target){
    for (let item in cookieVal){
        res.cookie(item,cookieVal[item]["value"],{
            maxAge: eval(cookieVal[item]["maxAge"])
        });
    }
    res.clearCookie("tag");

    if(target == "/login" || target == "/admin"){
        res.clearCookie("sessionId");
    }
    
    res.render(path.join(__dirname, `../views/${target}`));
}

function sendRedirect(req,res,target){
    console.log(cookieVal);
    for (item in cookieVal){
        res.cookie(item,cookieVal[item]["value"],{
            maxAge: cookieVal[item]["maxAge"]
        });
        console.log(item);
    }
    res.redirect(target);
}



module.exports={
    "sendRender":sendRender,
    "sendRedirect":sendRedirect
}