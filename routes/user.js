// Load Module Dependencies
var express   =   require('express');

var user  = require('../controllers/user');
var auth  = require('../controllers/auth');

// Create a Router
var router = express.Router();

/**
 * @api {post} /users/signup Signup User
 * @apiName CreateUser
 * @apiGroup users
 *
 * @apiParam {String} email Email Address
 * @apiParam {String} password User Password
 * @apiParam {String} first_name  First Name
 * @apiParam {String} last_name Last Name
 * @apiParam {String} user_type User Type - consumer
 *
 * @apiParamExample Request Example:
 *  {
 *    "first_name": "olivia",
 *    "last_name": "Pope",
 *    "email": "oliviapope@gmail.com",
 *    "password": "whitehat",
 *    "user_type": "consumer"
 *  }
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {ObjectId} profile Profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {Date} date_created Date Created
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} realm User Realm/Group
 *
 * @apiSuccessExample Response Example:
 *  {
 *    "_id": "58b4c977d2795f3408c20ad3",
 *    "user": "oliviapope@gmail.com",
 *    "profile": "58b4c977d2795f3408c20ad4",
 *    "last_modified": "2017-02-28T00:51:03.522Z",
 *    "date_created": "2017-02-28T00:51:03.522Z",
 *    "realm": "user",
 *    "role": "consumer"
 *  }
 */
router.post('/signup', user.createUser);

/**
 * @api {post} /users/login Login User
 * @apiName login
 * @apiGroup auth
 *
 * @apiParam {String} username Email Address
 * @apiParam {String} password User Password
 *
 * @apiParamExample Request Example:
 *  {
 *    "username": "oliviapope@gmail.com",
 *    "password": "whitehat"
 *  }
 *
 * @apiSuccess {String} token Unique token
 * @apiSuccess {ObjectId} _id Unique User Id
 *
 * @apiSuccessExample Response Example:
 *  {
 *  "token": "mRIT9UxkvlpppDxPHpiX",
 *  "_id": "58b4c977d2795f3408c20ad3",
 *  }
 */
router.post('/login', auth.login);

// POST /users/logout
router.post('/:_id/logout', auth.logout);

/**
 * @api {get} /users/all GET users collection
 * @apiName getUserCollection
 * @apiGroup users
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {String} password Unique password
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample Response Example:
 * [
 *  {
 *   "_id": "58b4c977d2795f3408c20ad3",
 *   "last_modified": "2017-02-28T01:01:34.463Z",
 *   "date_created": "2017-02-28T00:51:03.500Z",
 *   "username": "oliviapope@hotmail.com",
 *   "password": "$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea",
 *   "role": "consumer",
 *   "profile": {
 *     "_id": "58b4c977d2795f3408c20ad4",
 *     "user": "58b4c977d2795f3408c20ad3",
 *     "first_name": "olivia",
 *     "last_name": "pope",
 *     "email": "oliviapope@hotmail.com",
 *     "consumer": "58b4c977d2795f3408c20ad5",
 *     "last_modified": "2017-02-28T00:51:03.531Z",
 *     "runs_created": [],
 *     "runs_joined": []
 * },
 *   "last_login": "2017-02-28T01:01:34.463Z",
 *   "status": "active",
 *   "realm": "user
 *  },
 * {
 * "_id": "58b7df64854ee81424866639",
 *  "last_modified": "2017-03-02T09:01:24.324Z",
 *   "date_created": "2017-03-02T09:01:24.109Z",
 *   "username": "winnie10@yahoo.com",
 *   "password": "$2a$07$inAjIjUi7fj63uSVi7b2NO.qCIHUljoLshMgyxHUisAVv0g2hb.Fq",
 *   "role": "consumer",
 *   "profile": {
 *     "_id": "58b7df64854ee8142486663a",
 *     "user": "58b7df64854ee81424866639",
 *     "first_name": "winnie",
 *     "last_name": "nyabuti",
 *     "email": "winnie10@yahoo.com",
 *     "consumer": "58b7df64854ee8142486663b",
 *     "last_modified": "2017-03-02T09:01:24.403Z",
 *     "runs_created": [],
 *     "runs_joined": []
 *   },
 *   "status": "active",
 *   "realm": "user"
 * }
 * ]
 */
router.get('/all', user.getUsers);

/**
 * @api {get} /users/:_id GET one user
 * @apiName fetchOne
 * @apiGroup users
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {String} password Unique password
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} realm User Realm/Group
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample Response Example:
 *  {
 *   "_id": "58b4c977d2795f3408c20ad3",
 *   "last_modified": "2017-02-28T01:01:34.463Z",
 *   "date_created": "2017-02-28T00:51:03.500Z",
 *   "username": "oliviapope@hotmail.com",
 *   "password": "$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea",
 *   "role": "consumer",
 *   "profile": {
 *     "_id": "58b4c977d2795f3408c20ad4",
 *     "user": "58b4c977d2795f3408c20ad3",
 *     "first_name": "olivia",
 *     "last_name": "pope",
 *     "email": "oliviapope@hotmail.com",
 *     "consumer": "58b4c977d2795f3408c20ad5",
 *     "last_modified": "2017-02-28T00:51:03.531Z",
 *     "runs_created": [],
 *     "runs_joined": []
 * },
 *   "last_login": "2017-02-28T01:01:34.463Z",
 *   "status": "active",
 *   "realm": "user
 *  }
 */
router.get('/:_id', user.fetchOne);

/**
 * @api {put} /users/:_id Update User
 * @apiName updateUser
 * @apiGroup users
 *
 * @apiParam {String} username Email Address
 * 
 *
 * @apiParamExample Request Example:
 *  {
 *    "username": "olivia@popeAdvocates.com",
 *  }
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {String} password Unique password9
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {String} realm User Realm/Group
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample Response Example:
 * {
 *   "_id": "58b4c977d2795f3408c20ad3",
 *   "last_modified": "2017-03-02T09:22:02.970Z",
 *   "date_created": "2017-02-28T00:51:03.500Z",
 *   "username": "olivia@popeAdocates.com",
 *   "password": "$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea",
 *   "role": "consumer",
 *   "profile": {
 *     "_id": "58b4c977d2795f3408c20ad4",
 *     "user": "58b4c977d2795f3408c20ad3",
 *     "first_name": "olivia",
 *     "last_name": "pope",
 *     "email": "oliviapope@hotmail.com",
 *     "consumer": "58b4c977d2795f3408c20ad5",
 *     "last_modified": "2017-02-28T00:51:03.531Z",
 *     "runs_created": [],
 *     "runs_joined": []
 * }
 */
router.put('/:_id', user.updateUser);

// DELETE /users/:userId
router.delete('/:_id', user.delete);



// Export Router
module.exports = router;
