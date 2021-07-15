var mysql=require('mysql');
const { setupMaster } = require('cluster');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '170259',
    database : 'login',
    port : '3100'
});

connection.connect(function(err){
    if(err){
        console.error(err);
    }
    else{
        console.log('connected');
    }
});

module.exports = connection;