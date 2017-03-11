// Load Module Dependencies
var express = require('express');
var profile = require('../controllers/profile');

// Create a Router
var router = express.Router();

/**
 * @api {get} /profiles/all Get profiles collection
 * @apiName getProfileCollection
 * @apiGroup profiles
 *
 * @apiSuccess {ObjectId} _id Unique Profile ID
 * @apiSuccess {ObjectId} user user Id
 * @apiSuccess {String} first_name users first_name
 * @apiSuccess {String} last_name users last_name
 * @apiSuccess {String} email Email Address
 * @apiSuccess {String} runs_created Runs created by user
 * @apiSuccess {String} runs_joined Runs user has joined
 *
 * @apiSuccessExample {json} Response Example:
 * [
 * {
 *   "_id": "58b9b8c0e19f4a24a69343bb",
 *   "user": {
 *     "_id": "58b9b8c0e19f4a24a69343ba",
 *     "last_modified": "2017-03-03T18:41:04.299Z",
 *     "date_created": "2017-03-03T18:41:04.271Z",
 *     "username": "winnie883@yahoo.com",
 *     "role": "consumer",
 *     "profile": "58b9b8c0e19f4a24a69343bb",
 *     "status": "active",
 *     "realm": "user"
 *   },
 *   "first_name": "winnie",
 *   "last_name": "nyabuti",
 *   "email": "winnie883@yahoo.com",
 *   "runs_created": [],
 *   "runs_joined": []
 * },
 *  {
 *   "_id": "58b9bc1cf123d525d4bde98e",
 *   "user": {
 *     "_id": "58b9bc1bf123d525d4bde98d",
 *     "last_modified": "2017-03-03T18:55:24.027Z",
 *     "date_created": "2017-03-03T18:55:23.992Z",
 *     "username": "maria283@yahoo.com",
 *     "role": "consumer",
 *     "profile": "58b9bc1cf123d525d4bde98e",
 *     "status": "active",
 *     "realm": "user"
 *   },
 *   "first_name": "maria",
 *   "last_name": "keru",
 *   "email": "maria283@yahoo.com",
 *   "runs_created": [],
 *   "runs_joined": []
 * }
 * ]
 */
router.get('/all', profile.getProfiles);


/**
 * @api {get} /profiles/:_id Get one profile
 * @apiName fetchOne
 * @apiGroup profiles
 *
 * @apiSuccess {ObjectId} _id Unique Profile ID
 * @apiSuccess {ObjectId} user user Id
 * @apiSuccess {String} first_name users first_name
 * @apiSuccess {String} last_name users last_name
 * @apiSuccess {String} email Email Address
 * @apiSuccess {String} runs_created Runs created by user
 * @apiSuccess {String} runs_joined Runs user has joined
 *
 * @apiSuccessExample {json} Response Example:
 * {
 *   "_id": "58b9b8c0e19f4a24a69343bb",
 *   "user": {
 *     "_id": "58b9b8c0e19f4a24a69343ba",
 *     "last_modified": "2017-03-03T18:41:04.299Z",
 *     "date_created": "2017-03-03T18:41:04.271Z",
 *     "username": "winnie883@yahoo.com",
 *     "role": "consumer",
 *     "profile": "58b9b8c0e19f4a24a69343bb",
 *     "status": "active",
 *     "realm": "user"
 *   },
 *   "first_name": "winnie",
 *   "last_name": "nyabuti",
 *   "email": "winnie883@yahoo.com",
 *   "runs_created": [],
 *   "runs_joined": []
 * }
 */
router.get('/:_id', profile.getProfile);


/**
 * @api {put} /profiles/:_id Update profile
 * @apiName updateProfile
 * @apiGroup profiles
 *
 * @apiParam {String} first_name users first_name
 * @apiParam {String} last_name users last_name
 * @apiParam {String} email Email Address
 * 
 *
 * @apiParamExample Request Example:
 *  {
 *    "first_name":"mirron",
 *    "last_name":"sans",
 *    "email":"mirron@hotmail.com"
 *  }
 *
 * @apiSuccess {ObjectId} _id Unique Profile ID
 * @apiSuccess {ObjectId} user user Id
 * @apiSuccess {String} first_name users first_name
 * @apiSuccess {String} last_name users last_name
 * @apiSuccess {String} email Email Address
 * @apiSuccess {String} runs_created Runs created by user
 * @apiSuccess {String} runs_joined Runs user has joined
 * @apiSuccess {Date} last_modified Last modified date

 *
 * @apiSuccessExample {json} Response Example:
 * {
 *   "_id": "58b9b8c0e19f4a24a69343bb",
 *   "user": {
 *     "_id": "58b9b8c0e19f4a24a69343ba",
 *     "last_modified": "2017-03-03T18:41:04.299Z",
 *     "date_created": "2017-03-03T18:41:04.271Z",
 *     "username": "winnie883@yahoo.com",
 *     "role": "consumer",
 *     "profile": "58b9b8c0e19f4a24a69343bb",
 *     "status": "active",
 *     "realm": "user"
 *   },
 *   "first_name": "mirron",
 *   "last_name": "sans",
 *   "email": "mirron@hotmail.com",
 *   "runs_created": [],
 *   "runs_joined": [],
 *   "last_modified": "2017-03-08T10:15:48.761Z"
 * }
 */
router.put('/:_id', profile.updateProfile);

router.get('/:_id/coordinates', profile.getCoordinates);


router.get('/:_id/joined', profile.getRunsJoined);

// Export Router
module.exports = router;

