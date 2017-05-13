// Load Module Dependencies
var express   =   require('express');

var athlete = require('../controllers/athlete');

// Create a Router
var router = express.Router();

/**
 * @api {post} /athletes/create Create a new athlete
 * @apiName CreateAthlete
 * @apiGroup Athletes
 *
 * @apiParam {String} name Athlete's name
 * @apiParam {String} age Athlete's age
 * @apiParam {String} gender Athlete's gender
 * @apiParam {Number} records Athlete's records broken
 * @apiParam {String} bio Athlete's bio
 * @apiParam {Number} medals Athlete's medals won
 *
 * @apiParamExample {json} Request-Example:
 *  {
	"name":"Catherine Ndereba",
	"age":"44",
	"gender":"female",
	"records":"11",
	"bio":"Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.",
	"medals":"29"
}
 *
 * @apiSuccess {ObjectId} _id Unique Athlete ID
 * @apiSuccess {String} name Athlete's name
 * @apiSuccess {String} age Athlete's age
 * @apiSuccess {String} gender Athlete's gender
 * @apiSuccess {Number} records Athlete's records broken
 * @apiSuccess {String} bio Athlete's bio
 * @apiSuccess {Number} medals Athlete's medals won
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 *  {
  "_id": "5915e304811685129013b646",
  "last_modified": "2017-05-12T16:29:56.535Z",
  "date_created": "2017-05-12T16:29:56.535Z",
  "name": "Catherine Ndereba",
  "age": "44",
  "gender": "female",
  "records": "11",
  "bio": "Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.",
  "medals": "29"
}
 */
router.post('/create', athlete.createAthlete);

/**
 * @api {get} /athletes/all Get all athletes
 * @apiName getAthleteCollection
 * @apiGroup Athletes
 *
 * @apiSuccess {ObjectId} _id Unique Athlete ID
 * @apiSuccess {String} name Athlete's name
 * @apiSuccess {String} age Athlete's age
 * @apiSuccess {String} gender Athlete's gender
 * @apiSuccess {Number} records Athlete's records broken
 * @apiSuccess {String} bio Athlete's bio
 * @apiSuccess {Number} medals Athlete's medals won
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * [
  {
    "_id": "5915e236811685129013b645",
    "last_modified": "2017-05-12T16:26:30.015Z",
    "date_created": "2017-05-12T16:26:30.015Z",
    "name": "Tirunesh Dibaba",
    "age": "31",
    "gender": "female",
    "records": "8",
    "bio": "Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.",
    "medals": "23"
  },
  {
    "_id": "5915e304811685129013b646",
    "last_modified": "2017-05-12T16:29:56.535Z",
    "date_created": "2017-05-12T16:29:56.535Z",
    "name": "Catherine Ndereba",
    "age": "44",
    "gender": "female",
    "records": "11",
    "bio": "Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.",
    "medals": "29"
  }
]
 */
router.get('/all', athlete.getAthletes);

/**
 * @api {get} /athletes/:_id Get one athlete
 * @apiName getAthlete
 * @apiGroup Athletes
 *
 * @apiSuccess {ObjectId} _id Unique Athlete ID
 * @apiSuccess {String} name Athlete's name
 * @apiSuccess {String} age Athlete's age
 * @apiSuccess {String} gender Athlete's gender
 * @apiSuccess {Number} records Athlete's records broken
 * @apiSuccess {String} bio Athlete's bio
 * @apiSuccess {Number} medals Athlete's medals won
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * 
 *  {
    "_id": "5915e236811685129013b645",
    "last_modified": "2017-05-12T16:26:30.015Z",
    "date_created": "2017-05-12T16:26:30.015Z",
    "name": "Tirunesh Dibaba",
    "age": "31",
    "gender": "female",
    "records": "8",
    "bio": "Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.",
    "medals": "23"
  }
 * 
 */
router.get('/:_id', athlete.fetchAthlete);

/**
 * @api {put} /athletes/:_id Update one athlete
 * @apiName updateAthlete
 * @apiGroup Athletes
 * 
 * @apiParam {String} records Athlete's records broken
 *
 * @apiParamExample Request-Example:
 *  {
 *	"records":"9"
 *   } 
 *
 * @apiSuccess {ObjectId} _id Unique Athlete ID
 * @apiSuccess {String} name Athlete's name
 * @apiSuccess {String} age Athlete's age
 * @apiSuccess {String} gender Athlete's gender
 * @apiSuccess {Number} records Athlete's records broken
 * @apiSuccess {String} bio Athlete's bio
 * @apiSuccess {Number} medals Athlete's medals won
 * @apiSuccess {String} last_modified Last Modified Date
 * @apiSuccess {String} date_created Date Created
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 Ok
 * 
 *  {
    "_id": "5915e236811685129013b645",
    "last_modified": "2017-05-12T16:26:30.015Z",
    "date_created": "2017-05-12T16:26:30.015Z",
    "name": "Tirunesh Dibaba",
    "age": "31",
    "gender": "female",
    "records": "9",
    "bio": "Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.",
    "medals": "23"
  }
 * 
 */
router.put('/:_id', athlete.updateAthlete);

/**
 * @api {delete} /athletes/:_id Delete a single athlete
 * @apiName deleteAthlete
 * @apiGroup Athletes
 *
 * @apiSuccessExample Response-Example:
 * HTTP/1.1 200 Ok
 * {}
 * 
 */
router.delete('/:_id', athlete.deleteAthlete);

// Export Router
module.exports = router;