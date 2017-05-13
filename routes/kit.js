// Load Module Dependencies
var express   =   require('express');

var kit = require('../controllers/kit');

// Create a Router
var router = express.Router();

/**
 * @api {post} /kits/create Create a new running kit
 * @apiName CreateKit
 * @apiGroup Kits
 *
 * @apiParam {String} name running kit's name
 * @apiParam {String} description running kit's description
 * @apiParam {String} brand running kit's brand
 *
 * @apiParamExample {json} Request-Example:
 *  {
	"name":"Adidas Adizero Tempo 8",
	"description":"TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.",
	"brand":"Adidas"
}
 *
 * @apiSuccess {ObjectId} _id Unique Kit ID
 * @apiSuccess {String} name running kit's name
 * @apiSuccess {String} description running kit's description
 * @apiSuccess {String} brand running kit's brand
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 *  {
  "_id": "5915ed08efd7ed1acbdb6183",
  "last_modified": "2017-05-12T17:12:40.399Z",
  "date_created": "2017-05-12T17:12:40.399Z",
  "name": "Adidas Adizero Tempo 8",
  "description": "TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.",
  "brand": "Adidas"
}
 */
router.post('/create', kit.createKit);

/**
 * @api {get} /kits/all Get all running kits
 * @apiName getKitCollection
 * @apiGroup Kits
 *
 * @apiSuccess {ObjectId} _id Unique Kit ID
 * @apiSuccess {String} name running kit's name
 * @apiSuccess {String} description running kit's description
 * @apiSuccess {String} brand running kit's brand
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * [
  {
    "_id": "5915ecbeefd7ed1acbdb6182",
    "last_modified": "2017-05-12T17:11:26.733Z",
    "date_created": "2017-05-12T17:11:26.733Z",
    "name": "Nike Zoom Vomero 12",
    "description": "The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.",
    "brand": "Nike"
  },
  {
    "_id": "5915ed08efd7ed1acbdb6183",
    "last_modified": "2017-05-12T17:12:40.399Z",
    "date_created": "2017-05-12T17:12:40.399Z",
    "name": "Adidas Adizero Tempo 8",
    "description": "TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.",
    "brand": "Adidas"
  }
]
*/
router.get('/all', kit.getKits);

/**
 * @api {get} /kits/:_id Get one running kit
 * @apiName getKit
 * @apiGroup Kits
 *
 * @apiSuccess {ObjectId} _id Unique Kit ID
 * @apiSuccess {String} name running kit's name
 * @apiSuccess {String} description running kit's description
 * @apiSuccess {String} brand running kit's brand
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * 
 *  {
    "_id": "5915ecbeefd7ed1acbdb6182",
    "last_modified": "2017-05-12T17:11:26.733Z",
    "date_created": "2017-05-12T17:11:26.733Z",
    "name": "Nike Zoom Vomero 12",
    "description": "The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.",
    "brand": "Nike"
  }
 * 
 */
router.get('/:_id', kit.fetchKit);

/**
 * @api {put} /kits/:_id Update one running kit
 * @apiName updateKit
 * @apiGroup Kits
 * 
 * @apiParam {String} name running kit's name
 *
 * @apiParamExample Request-Example:
 *  {
 *	"name":"Nike Zoom Vomero 2017"
 *   } 
 *
 * @apiSuccess {ObjectId} _id Unique Kit ID
 * @apiSuccess {String} name running kit's name
 * @apiSuccess {String} description running kit's description
 * @apiSuccess {String} brand running kit's brand
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * 
 *  {
    "_id": "5915ecbeefd7ed1acbdb6182",
    "last_modified": "2017-05-12T17:11:26.733Z",
    "date_created": "2017-05-12T17:11:26.733Z",
    "name": "Nike Zoom Vomero 2017",
    "description": "The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.",
    "brand": "Nike"
  }
 * 
 */
router.put('/:_id', kit.updateKit);

/**
 * @api {delete} /kits/:_id Delete a single running kit
 * @apiName deleteKit
 * @apiGroup Kits
 *
 * @apiSuccessExample Response-Example:
 * HTTP/1.1 200 Ok
 * {}
 * 
 */
router.delete('/:_id', kit.deleteKit);

// Export Router
module.exports = router;