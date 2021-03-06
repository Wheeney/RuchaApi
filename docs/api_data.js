define({ "api": [
  {
    "type": "get",
    "url": "/admins/:_id",
    "title": "Get one admin",
    "name": "getAdmin",
    "group": "Admins",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n[\n  {\n    \"_id\": \"5915f5752feaad21c070eebf\",\n    \"last_modified\": \"2017-05-12T17:52:31.288Z\",\n    \"date_created\": \"2017-05-12T17:48:37.308Z\",\n    \"username\": \"habte@gmail.com\",\n    \"role\": \"admin\",\n    \"profile\": {\n      \"_id\": \"5915f5752feaad21c070eec0\",\n      \"date_created\": \"2017-05-12T17:48:37.506Z\",\n      \"user\": \"5915f5752feaad21c070eebf\",\n      \"first_name\": \"Habtamu\",\n      \"last_name\": \"Hailu\",\n      \"email\": \"habte@gmail.com\",\n      \"quick_runs\": [],\n      \"pending_invitations\": [],\n      \"runs_joined\": [],\n      \"runs_created\": []\n    },\n    \"last_login\": \"2017-05-12T17:52:31.287Z\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "get",
    "url": "/admins/all",
    "title": "Get all admins",
    "name": "getAdminCollection",
    "group": "Admins",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n[\n  {\n    \"_id\": \"5915f5752feaad21c070eebf\",\n    \"last_modified\": \"2017-05-12T17:52:31.288Z\",\n    \"date_created\": \"2017-05-12T17:48:37.308Z\",\n    \"username\": \"habte@gmail.com\",\n    \"role\": \"admin\",\n    \"profile\": {\n      \"_id\": \"5915f5752feaad21c070eec0\",\n      \"date_created\": \"2017-05-12T17:48:37.506Z\",\n      \"user\": \"5915f5752feaad21c070eebf\",\n      \"first_name\": \"Habtamu\",\n      \"last_name\": \"Hailu\",\n      \"email\": \"habte@gmail.com\",\n      \"quick_runs\": [],\n      \"pending_invitations\": [],\n      \"runs_joined\": [],\n      \"runs_created\": []\n    },\n    \"last_login\": \"2017-05-12T17:52:31.287Z\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  {\n    \"_id\": \"5915f8dcb7da1a23f6ba60f8\",\n    \"last_modified\": \"2017-05-12T18:03:08.671Z\",\n    \"date_created\": \"2017-05-12T18:03:08.627Z\",\n    \"username\": \"ismael@gmail.com\",\n    \"role\": \"admin\",\n    \"profile\": {\n      \"_id\": \"5915f8dcb7da1a23f6ba60f9\",\n      \"date_created\": \"2017-05-12T18:03:08.654Z\",\n      \"user\": \"5915f8dcb7da1a23f6ba60f8\",\n      \"first_name\": \"ismael\",\n      \"last_name\": \"kedir\",\n      \"email\": \"ismael@gmail.com\",\n      \"quick_runs\": [],\n      \"pending_invitations\": [],\n      \"runs_joined\": [],\n      \"runs_created\": []\n    },\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "put",
    "url": "/admins/:_id",
    "title": "Update one admin",
    "name": "updateAdmin",
    "group": "Admins",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"username\":\"habte88@yahoo.com\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n[\n  {\n    \"_id\": \"5915f5752feaad21c070eebf\",\n    \"last_modified\": \"2017-05-12T17:52:31.288Z\",\n    \"date_created\": \"2017-05-12T17:48:37.308Z\",\n    \"username\": \"habte88@yahoo.com\",\n    \"role\": \"admin\",\n    \"profile\": {\n      \"_id\": \"5915f5752feaad21c070eec0\",\n      \"date_created\": \"2017-05-12T17:48:37.506Z\",\n      \"user\": \"5915f5752feaad21c070eebf\",\n      \"first_name\": \"Habtamu\",\n      \"last_name\": \"Hailu\",\n      \"email\": \"habte@gmail.com\",\n      \"quick_runs\": [],\n      \"pending_invitations\": [],\n      \"runs_joined\": [],\n      \"runs_created\": []\n    },\n    \"last_login\": \"2017-05-12T17:52:31.287Z\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/athletes/create",
    "title": "Create a new athlete",
    "name": "CreateAthlete",
    "group": "Athletes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Athlete's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Athlete's age</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Athlete's gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Athlete's bio</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "medals",
            "description": "<p>Athlete's medals won</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"name\":\"Catherine Ndereba\",\n\t\"age\":\"44\",\n\t\"gender\":\"female\",\n\t\"records\":\"11\",\n\t\"bio\":\"Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.\",\n\t\"medals\":\"29\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Athlete ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Athlete's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Athlete's age</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Athlete's gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Athlete's bio</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "medals",
            "description": "<p>Athlete's medals won</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n {\n  \"_id\": \"5915e304811685129013b646\",\n  \"last_modified\": \"2017-05-12T16:29:56.535Z\",\n  \"date_created\": \"2017-05-12T16:29:56.535Z\",\n  \"name\": \"Catherine Ndereba\",\n  \"age\": \"44\",\n  \"gender\": \"female\",\n  \"records\": \"11\",\n  \"bio\": \"Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.\",\n  \"medals\": \"29\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/athlete.js",
    "groupTitle": "Athletes"
  },
  {
    "type": "delete",
    "url": "/athletes/:_id",
    "title": "Delete a single athlete",
    "name": "deleteAthlete",
    "group": "Athletes",
    "success": {
      "examples": [
        {
          "title": "Response-Example:",
          "content": "HTTP/1.1 200 Ok\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/athlete.js",
    "groupTitle": "Athletes"
  },
  {
    "type": "get",
    "url": "/athletes/:_id",
    "title": "Get one athlete",
    "name": "getAthlete",
    "group": "Athletes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Athlete ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Athlete's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Athlete's age</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Athlete's gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Athlete's bio</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "medals",
            "description": "<p>Athlete's medals won</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n\n {\n    \"_id\": \"5915e236811685129013b645\",\n    \"last_modified\": \"2017-05-12T16:26:30.015Z\",\n    \"date_created\": \"2017-05-12T16:26:30.015Z\",\n    \"name\": \"Tirunesh Dibaba\",\n    \"age\": \"31\",\n    \"gender\": \"female\",\n    \"records\": \"8\",\n    \"bio\": \"Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.\",\n    \"medals\": \"23\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/athlete.js",
    "groupTitle": "Athletes"
  },
  {
    "type": "get",
    "url": "/athletes/all",
    "title": "Get all athletes",
    "name": "getAthleteCollection",
    "group": "Athletes",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Athlete ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Athlete's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Athlete's age</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Athlete's gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Athlete's bio</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "medals",
            "description": "<p>Athlete's medals won</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n[\n  {\n    \"_id\": \"5915e236811685129013b645\",\n    \"last_modified\": \"2017-05-12T16:26:30.015Z\",\n    \"date_created\": \"2017-05-12T16:26:30.015Z\",\n    \"name\": \"Tirunesh Dibaba\",\n    \"age\": \"31\",\n    \"gender\": \"female\",\n    \"records\": \"8\",\n    \"bio\": \"Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.\",\n    \"medals\": \"23\"\n  },\n  {\n    \"_id\": \"5915e304811685129013b646\",\n    \"last_modified\": \"2017-05-12T16:29:56.535Z\",\n    \"date_created\": \"2017-05-12T16:29:56.535Z\",\n    \"name\": \"Catherine Ndereba\",\n    \"age\": \"44\",\n    \"gender\": \"female\",\n    \"records\": \"11\",\n    \"bio\": \"Catherine Nyambura Ndereba[1] (born 21 July 1972) is a Kenyan marathon runner. She has twice won the marathon at the World Championships in Athletics and won silver medals in the Olympics in 2004 and 2008. She is also a four-time winner of the Boston Marathon. Ndereba broke the women's marathon world record in 2001, running 2:18:47 at the Chicago Marathon.In 2008, Ndereba was described by a Chicago Tribune sportswriter as the greatest women's marathoner of all time.\",\n    \"medals\": \"29\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/athlete.js",
    "groupTitle": "Athletes"
  },
  {
    "type": "put",
    "url": "/athletes/:_id",
    "title": "Update one athlete",
    "name": "updateAthlete",
    "group": "Athletes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"records\":\"9\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Athlete ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Athlete's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>Athlete's age</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Athlete's gender</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "records",
            "description": "<p>Athlete's records broken</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "bio",
            "description": "<p>Athlete's bio</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "medals",
            "description": "<p>Athlete's medals won</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n\n {\n    \"_id\": \"5915e236811685129013b645\",\n    \"last_modified\": \"2017-05-12T16:26:30.015Z\",\n    \"date_created\": \"2017-05-12T16:26:30.015Z\",\n    \"name\": \"Tirunesh Dibaba\",\n    \"age\": \"31\",\n    \"gender\": \"female\",\n    \"records\": \"9\",\n    \"bio\": \"Tirunesh Dibaba also known as Tirunesh Dibaba Kenene (Amharic: ጥሩነሽ ዲባባ ቀነኒ; born June 1, 1985) is an Ethiopian long distance track athlete and the outdoor 5000 metres world record holder.She is the current World champion. She has won in total eight world track titles (three Olympic Gold medals and five World Championship Gold medals) and five world cross country titles. She is nicknamed the Baby Faced Destroyer.\",\n    \"medals\": \"23\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/athlete.js",
    "groupTitle": "Athletes"
  },
  {
    "type": "post",
    "url": "/invites/create",
    "title": "Create an invite",
    "name": "createInvite",
    "group": "Invite",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "run",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "invitees",
            "description": "<p>Unique invitees ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"run\":\"58ca7baccb0978699d7828aa\",\n  \"invitees\":\"58ca5e7d3e50b3295245aead\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique invite ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "run",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "invitees",
            "description": "<p>Unique invitees ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": " {\n \"_id\": \"58ca9edc006ad4051044efd7\",\n \"run\": {\n  \"_id\": \"58ca7baccb0978699d7828aa\",\n  \"name\": \"swaras marathon\",\n  \"location\": \"nairobi\",\n  \"scheduled_date\": \"2017-01-05T00:00:00.000Z\",\n  \"visibility\": \"private\",\n  \"date_created\": \"2017-03-16T11:49:00.323Z\",\n  \"last_modified\": \"2017-03-16T11:52:26.429Z\",\n  \"pendingInvites\": [\n    \"58ca5e7d3e50b3295245aead\"\n  ],\n  \"declinedInvites\": [],\n  \"acceptedInvites\": [],\n  \"invitees\": [],\n  \"participants\": []\n },\n\"invitees\": [\n  \"58ca5e7d3e50b3295245aead\"\n]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/invite.js",
    "groupTitle": "Invite"
  },
  {
    "type": "post",
    "url": "/kits/create",
    "title": "Create a new running kit",
    "name": "CreateKit",
    "group": "Kits",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>running kit's description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>running kit's brand</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"name\":\"Adidas Adizero Tempo 8\",\n\t\"description\":\"TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.\",\n\t\"brand\":\"Adidas\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Kit ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>running kit's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>running kit's brand</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n {\n  \"_id\": \"5915ed08efd7ed1acbdb6183\",\n  \"last_modified\": \"2017-05-12T17:12:40.399Z\",\n  \"date_created\": \"2017-05-12T17:12:40.399Z\",\n  \"name\": \"Adidas Adizero Tempo 8\",\n  \"description\": \"TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.\",\n  \"brand\": \"Adidas\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kit.js",
    "groupTitle": "Kits"
  },
  {
    "type": "delete",
    "url": "/kits/:_id",
    "title": "Delete a single running kit",
    "name": "deleteKit",
    "group": "Kits",
    "success": {
      "examples": [
        {
          "title": "Response-Example:",
          "content": "HTTP/1.1 200 Ok\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kit.js",
    "groupTitle": "Kits"
  },
  {
    "type": "get",
    "url": "/kits/:_id",
    "title": "Get one running kit",
    "name": "getKit",
    "group": "Kits",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Kit ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>running kit's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>running kit's brand</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n\n {\n    \"_id\": \"5915ecbeefd7ed1acbdb6182\",\n    \"last_modified\": \"2017-05-12T17:11:26.733Z\",\n    \"date_created\": \"2017-05-12T17:11:26.733Z\",\n    \"name\": \"Nike Zoom Vomero 12\",\n    \"description\": \"The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.\",\n    \"brand\": \"Nike\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kit.js",
    "groupTitle": "Kits"
  },
  {
    "type": "get",
    "url": "/kits/all",
    "title": "Get all running kits",
    "name": "getKitCollection",
    "group": "Kits",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Kit ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>running kit's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>running kit's brand</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n[\n  {\n    \"_id\": \"5915ecbeefd7ed1acbdb6182\",\n    \"last_modified\": \"2017-05-12T17:11:26.733Z\",\n    \"date_created\": \"2017-05-12T17:11:26.733Z\",\n    \"name\": \"Nike Zoom Vomero 12\",\n    \"description\": \"The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.\",\n    \"brand\": \"Nike\"\n  },\n  {\n    \"_id\": \"5915ed08efd7ed1acbdb6183\",\n    \"last_modified\": \"2017-05-12T17:12:40.399Z\",\n    \"date_created\": \"2017-05-12T17:12:40.399Z\",\n    \"name\": \"Adidas Adizero Tempo 8\",\n    \"description\": \"TThe Adidas Adizero Tempo 8 is the shoe you’ll run your next PB in. It is light, responsive and fast giving you just the right amount of support along the way.\",\n    \"brand\": \"Adidas\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kit.js",
    "groupTitle": "Kits"
  },
  {
    "type": "put",
    "url": "/kits/:_id",
    "title": "Update one running kit",
    "name": "updateKit",
    "group": "Kits",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\n\t\"name\":\"Nike Zoom Vomero 2017\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Kit ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>running kit's name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>running kit's description</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "brand",
            "description": "<p>running kit's brand</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 Ok\n\n {\n    \"_id\": \"5915ecbeefd7ed1acbdb6182\",\n    \"last_modified\": \"2017-05-12T17:11:26.733Z\",\n    \"date_created\": \"2017-05-12T17:11:26.733Z\",\n    \"name\": \"Nike Zoom Vomero 2017\",\n    \"description\": \"The combination of a soft midsole and a very comfortable upper with the ability to lock down the fit are what make this shoe really great. It provides great responsiveness and ground feel compared to a lot of shoes in its category. It could easily be used as a multipurpose shoe for training and racing for those preferring cushion over lightweight.\",\n    \"brand\": \"Nike\"\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/kit.js",
    "groupTitle": "Kits"
  },
  {
    "type": "post",
    "url": "/quickRun/create",
    "title": "Create a quickRun",
    "name": "createQuickRun",
    "group": "Quick_Run",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": " {\n \"starting_point\":{\n\t\t\"name\":\"nairobi\",\n\t\t\"lat\":\"-1.291536\",\n\t\t\"long\":\"36.845736\"\n\t},\n\t\"ending_point\":{\n\t\t\"name\":\"nakuru\",\n\t\t\"lat\":\"0.3031\",\n\t\t\"long\":\"36.0800\"\n\t},\n\t\"start_time\":\"06:00:00\",\n\t\"end_time\":\"08:30:00\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique quickRun ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 201 Created\n {\n\"_id\": \"58ef571982d57f346d8bb518\",\n\"last_modified\": \"2017-04-13T10:46:49.781Z\",\n\"date_created\": \"2017-04-13T10:46:49.781Z\",\n\"start_time\": \"06:00:00\",\n\"end_time\": \"08:30:00\",\n\"ending_point\": {\n  \"name\": \"nakuru\",\n  \"lat\": 0.3031,\n  \"long\": 36.08\n},\n\"starting_point\": {\n  \"name\": \"nairobi\",\n \"lat\": -1.291536,\n  \"long\": 36.845736\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "delete",
    "url": "/quickRun/:_id",
    "title": "Delete a single quickRun",
    "name": "deletequickRun",
    "group": "Quick_Run",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "get",
    "url": "/quickRun/:_id/calc",
    "title": "Get calories lost in a single quickRun",
    "name": "getCaloriesLost",
    "group": "Quick_Run",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique quickRun ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance covered</p>"
          },
          {
            "group": "Success 200",
            "type": "calories_burned",
            "optional": false,
            "field": "calories_burned",
            "description": "<p>calories_burned per run</p>"
          },
          {
            "group": "Success 200",
            "type": "kcal_per_min",
            "optional": false,
            "field": "kcal_per_min",
            "description": "<p>calories_burned per min of each run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n {\n  \"_id\": \"58ef56c37abd7c311221e480\",\n  \"last_modified\": \"2017-04-13T12:42:45.038Z\",\n  \"date_created\": \"2017-04-13T10:45:23.928Z\",\n  \"start_time\": \"06:00:00\",\n  \"end_time\": \"08:30:00\",\n  \"distance\": 196.6872310775424,\n  \"kcal_per_min\": \"10.526003824091777\",\n  \"calories_burned\": \"26.31500956022944\",\n  \"ending_point\": {\n    \"name\": \"nakuru\",\n    \"lat\": 0.3031,\n    \"long\": 36.08\n  },\n  \"starting_point\": {\n    \"name\": \"nairobi\",\n    \"lat\": -1.291536,\n    \"long\": 36.845736\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "get",
    "url": "/quickRun/:_id",
    "title": "Get a single quickRun data",
    "name": "getOneQuickRun",
    "group": "Quick_Run",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique quickRun ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance covered</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n    \"_id\": \"58ef571982d57f346d8bb518\",\n    \"last_modified\": \"2017-04-13T10:46:49.823Z\",\n    \"date_created\": \"2017-04-13T10:46:49.781Z\",\n    \"start_time\": \"06:00:00\",\n    \"end_time\": \"08:30:00\",\n    \"distance\": 196.6872310775424,\n    \"ending_point\": {\n      \"name\": \"nakuru\",\n      \"lat\": 0.3031,\n      \"long\": 36.08\n    },\n    \"starting_point\": {\n      \"name\": \"nairobi\",\n      \"lat\": -1.291536,\n      \"long\": 36.845736\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "get",
    "url": "/quickRun/all",
    "title": "Get quickRun collection",
    "name": "getQuickRunCollection",
    "group": "Quick_Run",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique quickRun ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance covered</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n    \"_id\": \"58ef56c37abd7c311221e480\",\n    \"last_modified\": \"2017-04-13T10:45:24.033Z\",\n    \"date_created\": \"2017-04-13T10:45:23.928Z\",\n    \"start_time\": \"07:00:00\",\n    \"end_time\": \"08:00:00\",\n    \"distance\": 69.5497976748658,\n    \"ending_point\": {\n      \"name\": \"nakuru\",\n      \"lat\": 0.3031,\n      \"long\": 36.08\n    },\n    \"starting_point\": {\n      \"name\": \"naivasha\",\n      \"lat\": 0.7172,\n      \"long\": 36.4310\n    }\n  },\n  {\n    \"_id\": \"58ef571982d57f346d8bb518\",\n    \"last_modified\": \"2017-04-13T10:46:49.823Z\",\n    \"date_created\": \"2017-04-13T10:46:49.781Z\",\n    \"start_time\": \"06:00:00\",\n    \"end_time\": \"08:30:00\",\n    \"distance\": 196.6872310775424,\n    \"ending_point\": {\n      \"name\": \"nakuru\",\n      \"lat\": 0.3031,\n      \"long\": 36.08\n    },\n    \"starting_point\": {\n      \"name\": \"nairobi\",\n      \"lat\": -1.291536,\n      \"long\": 36.845736\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "put",
    "url": "/quickRun/:_id",
    "title": "Update a single quickRun data",
    "name": "updateOneQuickRun",
    "group": "Quick_Run",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"end_time\":\"09:30:00\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique quickRun ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "starting_point",
            "description": "<p>Run starting_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ending_point",
            "description": "<p>Run ending_point</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>Run start_time</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>Run end_time</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "distance",
            "description": "<p>Distance covered</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n    \"_id\": \"58ef571982d57f346d8bb518\",\n    \"last_modified\": \"2017-04-13T10:46:49.823Z\",\n    \"date_created\": \"2017-04-13T10:46:49.781Z\",\n    \"start_time\": \"06:00:00\",\n    \"end_time\": \"09:30:00\",\n    \"distance\": 196.6872310775424,\n    \"ending_point\": {\n      \"name\": \"nakuru\",\n      \"lat\": 0.3031,\n      \"long\": 36.08\n    },\n    \"starting_point\": {\n      \"name\": \"nairobi\",\n      \"lat\": -1.291536,\n      \"long\": 36.845736\n    }\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/quickRun.js",
    "groupTitle": "Quick_Run"
  },
  {
    "type": "post",
    "url": "/runs/create",
    "title": "Create a run event",
    "name": "CreateRun",
    "group": "Runs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Run name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": " {\n\t\"name\":\"power run\",\n\t\"location\":\"nyayo stadium\",\n\t\"scheduled_date\":\"2014-03-05\",\n\t\"visibility\":\"public\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 201 Created\n {\n \"_id\": \"58b7ed442e4b9419b674c3a2\",\n \"name\": \"power run\",\n \"location\": \"nyayo stadium\",\n \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n \"visibility\": \"public\",\n \"creator\": \"olivia\",\n \"date_created\": \"2017-03-02T11:22:49.481Z\",\n \"last_modified\": \"2017-03-02T11:22:49.481Z\",\n \"participants\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "delete",
    "url": "/runs/:_id",
    "title": "Delete a single run event",
    "name": "deleteRun",
    "group": "Runs",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n{}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/open/:_id",
    "title": "Get one public run event",
    "name": "getOnePublicRun",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"creator\": \"olivia\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/open",
    "title": "Get a collection of public run events",
    "name": "getPublicRunCollection",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"creator\": \"olivia\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n },\n {\n  \"_id\": \"58b672dad0f41016cf97230a\",\n  \"name\": \"urban swaras\",\n  \"location\": \"karura forest\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",  \n  \"visibility\": \"public\",\n  \"creator\": \"winnie\", \n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/:_id",
    "title": "Get one run event",
    "name": "getRun",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"creator\": \"olivia\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/all",
    "title": "Get a run collection",
    "name": "getRunCollection",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"creator\": \"olivia\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n },\n {\n  \"_id\": \"58b672dad0f41016cf97230a\",\n  \"name\": \"aberdare runners\",\n  \"location\": \"KU field\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",  \n  \"visibility\": \"private\",\n  \"creator\": \"winnie\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/:_id/participants",
    "title": "Get all participants of a run event",
    "name": "getRunParticipants",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique participants ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n [\n   \"58d24895c2b5446a5ec60d8e\",\n   \"58b7ed442e4b9419b674c3a2\",\n   \"58cfddb2f37c247a4176da74\"\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/:_id/join",
    "title": "Join a run event",
    "name": "joinRun",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n {\n \"_id\": \"58b7ed442e4b9419b674c3a2\",\n \"name\": \"power run\",\n \"location\": \"nyayo stadium\",\n \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n \"visibility\": \"public\",\n \"creator\": \"olivia\",\n \"date_created\": \"2017-03-02T11:22:49.481Z\",\n \"last_modified\": \"2017-03-02T11:22:49.481Z\",\n \"participants\": [\n   58b67331d0f41016cf97230d\n]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/search?search=param",
    "title": "search run by location",
    "name": "search",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"creator\": \"olivia\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"participants\": []\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "get",
    "url": "/runs/:_id/unfollow",
    "title": "Unfollow a run event",
    "name": "unfollowRun",
    "group": "Runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n {\n \"_id\": \"58b7ed442e4b9419b674c3a2\",\n \"name\": \"power run\",\n \"location\": \"nyayo stadium\",\n \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n \"visibility\": \"public\",\n \"creator\": \"olivia\",\n \"date_created\": \"2017-03-02T11:22:49.481Z\",\n \"last_modified\": \"2017-03-02T11:22:49.481Z\",\n \"participants\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "put",
    "url": "/runs/:_id",
    "title": "Update a run event",
    "name": "updateRun",
    "group": "Runs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Run name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": " {\n\t\"name\":\"karura runners\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Run ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location of run</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "scheduled_date",
            "description": "<p>Date of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "visibility",
            "description": "<p>public /private</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "creator",
            "description": "<p>Creator of run</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n {\n \"_id\": \"58b7ed442e4b9419b674c3a2\",\n \"name\": \"karura runners\",\n \"location\": \"nyayo stadium\",\n \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n \"visibility\": \"public\",\n \"creator\": \"olivia\",\n \"date_created\": \"2017-03-02T11:22:49.481Z\",\n \"last_modified\": \"2017-03-02T11:22:49.481Z\",\n \"participants\": []\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "Runs"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Signup User",
    "name": "CreateUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_type",
            "description": "<p>User Type - consumer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"first_name\": \"olivia\",\n  \"last_name\": \"Pope\",\n  \"email\": \"oliviapope@gmail.com\",\n  \"user_type\": \"consumer\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>Profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date_created",
            "description": "<p>Date Created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "realm",
            "description": "<p>User Realm/Group</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"user\": \"oliviapope@gmail.com\",\n  \"profile\": \"58b4c977d2795f3408c20ad4\",\n  \"last_modified\": \"2017-02-28T00:51:03.522Z\",\n  \"date_created\": \"2017-02-28T00:51:03.522Z\",\n  \"realm\": \"user\",\n  \"role\": \"consumer\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:_id",
    "title": "Get one user",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "fetchOne",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "realm",
            "description": "<p>User Realm/Group</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": " {\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-02-28T01:01:34.463Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"oliviapope@hotmail.com\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"run_invitation\": [],\n    \"runs_created\": [],\n    \"runs_joined\": []\n},\n  \"last_login\": \"2017-02-28T01:01:34.463Z\",\n  \"status\": \"active\",\n  \"realm\": \"user\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/all",
    "title": "Get users collection",
    "name": "getUserCollection",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[\n {\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-02-28T01:01:34.463Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"oliviapope@hotmail.com\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"run_invitation\": [],\n    \"runs_created\": [],\n    \"runs_joined\": []\n},\n  \"last_login\": \"2017-02-28T01:01:34.463Z\",\n  \"status\": \"active\",\n  \"realm\": \"user\n },\n{\n\"_id\": \"58b7df64854ee81424866639\",\n \"last_modified\": \"2017-03-02T09:01:24.324Z\",\n  \"date_created\": \"2017-03-02T09:01:24.109Z\",\n  \"username\": \"winnie10@yahoo.com\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b7df64854ee8142486663a\",\n    \"user\": \"58b7df64854ee81424866639\",\n    \"first_name\": \"winnie\",\n    \"last_name\": \"nyabuti\",\n    \"email\": \"winnie10@yahoo.com\",\n    \"consumer\": \"58b7df64854ee8142486663b\",\n    \"last_modified\": \"2017-03-02T09:01:24.403Z\",\n    \"run_invitation\": [],\n    \"runs_created\": [],\n    \"runs_joined\": []\n  },\n  \"status\": \"active\",\n  \"realm\": \"user\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login User",
    "name": "login",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"username\": \"oliviapope@gmail.com\",\n  \"password\": \"whitehat\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Unique token</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n\"token\": \"mRIT9UxkvlpppDxPHpiX\",\n\"_id\": \"58b4c977d2795f3408c20ad3\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout User",
    "name": "logout",
    "group": "Users",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n\"message\": \"success logout\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "/users/:_id",
    "title": "Update User",
    "name": "updateUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"username\": \"olivia@popeAdvocates.com\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "profile",
            "description": "<p>profile Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last Modified Date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User Role</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "realm",
            "description": "<p>User Realm/Group</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_login",
            "description": "<p>Last login date</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>user status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-03-02T09:22:02.970Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"olivia@popeAdocates.com\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"run_invitation\": [],\n    \"runs_created\": [],\n    \"runs_joined\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/profiles/:_id",
    "title": "Get one profile",
    "name": "fetchOne",
    "group": "profiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Profile ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "user",
            "description": "<p>user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>users first_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>users last_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "run_invitation",
            "description": "<p>Run invites received</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_created",
            "description": "<p>Runs created by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_joined",
            "description": "<p>Runs user has joined</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"_id\": \"58b9b8c0e19f4a24a69343bb\",\n  \"user\": {\n    \"_id\": \"58b9b8c0e19f4a24a69343ba\",\n    \"last_modified\": \"2017-03-03T18:41:04.299Z\",\n    \"date_created\": \"2017-03-03T18:41:04.271Z\",\n    \"username\": \"winnie883@yahoo.com\",\n    \"role\": \"consumer\",\n    \"profile\": \"58b9b8c0e19f4a24a69343bb\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  \"first_name\": \"winnie\",\n  \"last_name\": \"nyabuti\",\n  \"email\": \"winnie883@yahoo.com\",\n  \"run_invitation\": [\n  \"58ca9edc006ad4051044efd7\"\n],\n  \"runs_created\": [],\n  \"runs_joined\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "profiles"
  },
  {
    "type": "get",
    "url": "/profiles/all",
    "title": "Get profiles collection",
    "name": "getProfileCollection",
    "group": "profiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Profile ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "user",
            "description": "<p>user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>users first_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>users last_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "run_invitation",
            "description": "<p>Run invites received</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_created",
            "description": "<p>Runs created by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_joined",
            "description": "<p>Runs user has joined</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n[\n{\n  \"_id\": \"58b9b8c0e19f4a24a69343bb\",\n  \"user\": {\n    \"_id\": \"58b9b8c0e19f4a24a69343ba\",\n    \"last_modified\": \"2017-03-03T18:41:04.299Z\",\n    \"date_created\": \"2017-03-03T18:41:04.271Z\",\n    \"username\": \"winnie883@yahoo.com\",\n    \"role\": \"consumer\",\n    \"profile\": \"58b9b8c0e19f4a24a69343bb\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  \"first_name\": \"winnie\",\n  \"last_name\": \"nyabuti\",\n  \"email\": \"winnie883@yahoo.com\",\n  \"run_invitation\": [\n  \"58ca9edc006ad4051044efd7\"\n],\n  \"runs_created\": [],\n  \"runs_joined\": []\n},\n {\n  \"_id\": \"58b9bc1cf123d525d4bde98e\",\n  \"user\": {\n    \"_id\": \"58b9bc1bf123d525d4bde98d\",\n    \"last_modified\": \"2017-03-03T18:55:24.027Z\",\n    \"date_created\": \"2017-03-03T18:55:23.992Z\",\n    \"username\": \"maria283@yahoo.com\",\n    \"role\": \"consumer\",\n    \"profile\": \"58b9bc1cf123d525d4bde98e\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  \"first_name\": \"maria\",\n  \"last_name\": \"keru\",\n  \"email\": \"maria283@yahoo.com\",\n  \"run_invitation\":[],\n  \"runs_created\": [],\n  \"runs_joined\": []\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "profiles"
  },
  {
    "type": "get",
    "url": "/profiles/search?search=param",
    "title": "Search user profile by name",
    "name": "search",
    "group": "profiles",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Profile ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "user",
            "description": "<p>user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>users first_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>users last_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "run_invitation",
            "description": "<p>Run invites received</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_created",
            "description": "<p>Runs created by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_joined",
            "description": "<p>Runs user has joined</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"_id\": \"58b9b8c0e19f4a24a69343bb\",\n  \"user\": {\n    \"_id\": \"58b9b8c0e19f4a24a69343ba\",\n    \"last_modified\": \"2017-03-03T18:41:04.299Z\",\n    \"date_created\": \"2017-03-03T18:41:04.271Z\",\n    \"username\": \"winnie883@yahoo.com\",\n    \"role\": \"consumer\",\n    \"profile\": \"58b9b8c0e19f4a24a69343bb\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  \"first_name\": \"winnie\",\n  \"last_name\": \"nyabuti\",\n  \"email\": \"winnie883@yahoo.com\",\n  \"run_invitation\": [\n  \"58ca9edc006ad4051044efd7\"\n],\n  \"runs_created\": [],\n  \"runs_joined\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "profiles"
  },
  {
    "type": "put",
    "url": "/profiles/:_id",
    "title": "Update profile",
    "name": "updateProfile",
    "group": "profiles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>users first_name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>users last_name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"first_name\":\"mirron\",\n  \"last_name\":\"sans\",\n  \"email\":\"mirron@hotmail.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique Profile ID</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "user",
            "description": "<p>user Id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>users first_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>users last_name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email Address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_created",
            "description": "<p>Runs created by user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "runs_joined",
            "description": "<p>Runs user has joined</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "last_modified",
            "description": "<p>Last modified date</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 Ok\n{\n  \"_id\": \"58b9b8c0e19f4a24a69343bb\",\n  \"user\": {\n    \"_id\": \"58b9b8c0e19f4a24a69343ba\",\n    \"last_modified\": \"2017-03-03T18:41:04.299Z\",\n    \"date_created\": \"2017-03-03T18:41:04.271Z\",\n    \"username\": \"winnie883@yahoo.com\",\n    \"role\": \"consumer\",\n    \"profile\": \"58b9b8c0e19f4a24a69343bb\",\n    \"status\": \"active\",\n    \"realm\": \"user\"\n  },\n  \"first_name\": \"mirron\",\n  \"last_name\": \"sans\",\n  \"email\": \"mirron@hotmail.com\",\n  \"runs_created\": [],\n  \"runs_joined\": [],\n  \"last_modified\": \"2017-03-08T10:15:48.761Z\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/profile.js",
    "groupTitle": "profiles"
  }
] });
