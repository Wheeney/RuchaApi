// Load Module Dependencies
var express = require('express');
var invite = require('../controllers/invite');

// Create a Router
var router = express.Router();

/**
 * @api {post} /invites/create Create an invite
 * @apiName createInvite
 * @apiGroup Invite
 *
 * @apiParam {ObjectId} run Unique Run ID
 * @apiParam {ObjectId} invitees Unique invitees ID
 *
 * @apiParamExample Request Example:
 *  {
 *    "run":"58ca7baccb0978699d7828aa",
 *    "invitees":"58ca5e7d3e50b3295245aead"
 *  }
 *
 * @apiSuccess {ObjectId} _id Unique invite ID
 * @apiSuccess {ObjectId} run Unique Run ID
 * @apiSuccess {ObjectId} invitees Unique invitees ID
 *
 * @apiSuccessExample {json} Response Example:
 *  {
 *  "_id": "58ca9edc006ad4051044efd7",
 *  "run": {
 *   "_id": "58ca7baccb0978699d7828aa",
 *   "name": "swaras marathon",
 *   "location": "nairobi",
 *   "scheduled_date": "2017-01-05T00:00:00.000Z",
 *   "visibility": "private",
 *   "date_created": "2017-03-16T11:49:00.323Z",
 *   "last_modified": "2017-03-16T11:52:26.429Z",
 *   "pendingInvites": [
 *     "58ca5e7d3e50b3295245aead"
 *   ],
 *   "declinedInvites": [],
 *   "acceptedInvites": [],
 *   "invitees": [],
 *   "participants": []
 *  },
 * "invitees": [
 *   "58ca5e7d3e50b3295245aead"
 * ]
 *  }
 */
router.post('/create', invite.createInvite);

router.get('/all', invite.getInvites);

router.get('/:_id', invite.fetchInvite);

router.get('/:_id/accept', invite.acceptInvite);

router.put('/:_id', invite.updateInvite);

router.delete('/:_id', invite.deleteInvite);

// Export Router
module.exports = router;