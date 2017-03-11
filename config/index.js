/**
 * Load module dependencies
 */
module.exports = {
    HTTP_PORT : 8888,

    //MONGODB URL
    MONGODB_URL : 'mongodb://localhost/rucha'|| 'http://127.0.0.1:8888',
    //salt value length
    SALT_LENGTH: 7,

    TOKEN_LENGTH: 15,

    // Configuring Mailgun API for sending transactional email
    mailgun_priv_key: 'mailgun private key here',

    // Configuring Mailgun domain for sending transactional email
    mailgun_domain: 'mailgun domain here'

};