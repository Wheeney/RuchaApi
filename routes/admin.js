// Load Module Dependencies
var express   =   require('express');

var admin = require('../controllers/admin');

// Create a Router
var router = express.Router();

/**
 * @api {get} /admins/all Get all admins
 * @apiName getAdminCollection
 * @apiGroup Admins
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * [
  {
    "_id": "5915f5752feaad21c070eebf",
    "last_modified": "2017-05-12T17:52:31.288Z",
    "date_created": "2017-05-12T17:48:37.308Z",
    "username": "habte@gmail.com",
    "role": "admin",
    "profile": {
      "_id": "5915f5752feaad21c070eec0",
      "date_created": "2017-05-12T17:48:37.506Z",
      "user": "5915f5752feaad21c070eebf",
      "first_name": "Habtamu",
      "last_name": "Hailu",
      "email": "habte@gmail.com",
      "quick_runs": [],
      "pending_invitations": [],
      "runs_joined": [],
      "runs_created": []
    },
    "last_login": "2017-05-12T17:52:31.287Z",
    "status": "active",
    "realm": "user"
  },
  {
    "_id": "5915f8dcb7da1a23f6ba60f8",
    "last_modified": "2017-05-12T18:03:08.671Z",
    "date_created": "2017-05-12T18:03:08.627Z",
    "username": "ismael@gmail.com",
    "role": "admin",
    "profile": {
      "_id": "5915f8dcb7da1a23f6ba60f9",
      "date_created": "2017-05-12T18:03:08.654Z",
      "user": "5915f8dcb7da1a23f6ba60f8",
      "first_name": "ismael",
      "last_name": "kedir",
      "email": "ismael@gmail.com",
      "quick_runs": [],
      "pending_invitations": [],
      "runs_joined": [],
      "runs_created": []
    },
    "status": "active",
    "realm": "user"
  }
]
 */
router.get('/all', admin.getAdmins);

/**
 * @api {get} /admins/:_id Get one admin
 * @apiName getAdmin
 * @apiGroup Admins
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * [
  {
    "_id": "5915f5752feaad21c070eebf",
    "last_modified": "2017-05-12T17:52:31.288Z",
    "date_created": "2017-05-12T17:48:37.308Z",
    "username": "habte@gmail.com",
    "role": "admin",
    "profile": {
      "_id": "5915f5752feaad21c070eec0",
      "date_created": "2017-05-12T17:48:37.506Z",
      "user": "5915f5752feaad21c070eebf",
      "first_name": "Habtamu",
      "last_name": "Hailu",
      "email": "habte@gmail.com",
      "quick_runs": [],
      "pending_invitations": [],
      "runs_joined": [],
      "runs_created": []
    },
    "last_login": "2017-05-12T17:52:31.287Z",
    "status": "active",
    "realm": "user"
  }
 * 
 */
router.get('/:_id', admin.getAdmin);

/**
 * @api {put} /admins/:_id Update one admin
 * @apiName updateAdmin
 * @apiGroup Admins
 * 
 * @apiParam {String} username Email Address
 *
 * @apiParamExample Request-Example:
 *  {
 *	"username":"habte88@yahoo.com"
 *   } 
 *
 * @apiSuccess {ObjectId} _id Unique User ID
 * @apiSuccess {String} username Email Address
 * @apiSuccess {ObjectId} profile profile Id
 * @apiSuccess {Date} last_modified Last Modified Date
 * @apiSuccess {String} role User Role
 * @apiSuccess {Date} last_login Last login date
 * @apiSuccess {String} status user status
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * [
  {
    "_id": "5915f5752feaad21c070eebf",
    "last_modified": "2017-05-12T17:52:31.288Z",
    "date_created": "2017-05-12T17:48:37.308Z",
    "username": "habte88@yahoo.com",
    "role": "admin",
    "profile": {
      "_id": "5915f5752feaad21c070eec0",
      "date_created": "2017-05-12T17:48:37.506Z",
      "user": "5915f5752feaad21c070eebf",
      "first_name": "Habtamu",
      "last_name": "Hailu",
      "email": "habte@gmail.com",
      "quick_runs": [],
      "pending_invitations": [],
      "runs_joined": [],
      "runs_created": []
    },
    "last_login": "2017-05-12T17:52:31.287Z",
    "status": "active",
    "realm": "user"
  }
 * 
 */
router.put('/:_id', admin.updateAdmin);

// Export Router
module.exports = router;