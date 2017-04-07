/**
 * Load module dependencies
 */
var env = process.env;

var PORT = env.PORT || 9900;
var MONGODB_URL = env.MONGODB_URL || 'mongodb://127.0.0.1:27017/xam';
var HOST = 'localhost';
var SGUSER = env.SGUSER|| 'kerubo111';
var SGPASSWORD = env.SGPASSWORD|| 'winnie111';
var SGAPIKEY = env.SGAPIKEY || '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'; 

module.exports = {
    PORT : PORT,
    HOST : HOST,
    SGUSER : SGUSER,
    SGPASSWORD : SGPASSWORD,
    SGAPIKEY : SGAPIKEY,

    //MongoDb URL
    MONGODB:{
        URL:MONGODB_URL,
        OPTS:{
            server:{
                auto_reconnect:true
            }
        }
    },

    //salt value length
    SALT_LENGTH: 7,

    TOKEN_LENGTH: 15

    

};