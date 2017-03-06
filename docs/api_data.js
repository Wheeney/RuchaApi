define({ "api": [
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login User",
    "name": "login",
    "group": "auth",
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
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/runs/new",
    "title": "create run",
    "name": "CreateRun",
    "group": "runs",
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
            "type": "String",
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
          "content": "{\n\"_id\": \"58b7ed442e4b9419b674c3a2\",\n\"name\": \"power run\",\n\"location\": \"nyayo stadium\",\n\"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n\"visibility\": \"public\",\n\"date_created\": \"2017-03-02T11:22:49.481Z\",\n\"last_modified\": \"2017-03-02T11:22:49.481Z\",\n\"followers\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "get",
    "url": "/runs/public",
    "title": "GET public runs collection",
    "name": "getPublicRunCollection",
    "group": "runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
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
          "content": "[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"followers\": []\n },\n {\n  \"_id\": \"58b672dad0f41016cf97230a\",\n  \"name\": \"urban swaras\",\n  \"location\": \"karura forest\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",  \n  \"visibility\": \"public\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"followers\": []\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "get",
    "url": "/runs/:_id",
    "title": "GET one run",
    "name": "getRun",
    "group": "runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
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
          "content": "\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"followers\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "get",
    "url": "/runs/all",
    "title": "GET runs collection",
    "name": "getRunCollection",
    "group": "runs",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
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
          "content": "[\n {\n  \"_id\": \"58b7ed442e4b9419b674c3a2\",\n  \"name\": \"power run\",\n  \"location\": \"nyayo stadium\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n  \"visibility\": \"public\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"followers\": []\n },\n {\n  \"_id\": \"58b672dad0f41016cf97230a\",\n  \"name\": \"aberdare runners\",\n  \"location\": \"KU field\",\n  \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",  \n  \"visibility\": \"private\",\n  \"last_modified\": \"2017-03-01T07:09:43.704Z\",\n  \"followers\": []\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "post",
    "url": "/runs/:_id",
    "title": "Join a run",
    "name": "joinRun",
    "group": "runs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "followers",
            "description": "<p>unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\"followers\":\"58b67331d0f41016cf97230d\"\n}",
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
          "content": " {\n \"_id\": \"58b7ed442e4b9419b674c3a2\",\n \"name\": \"power run\",\n \"location\": \"nyayo stadium\",\n \"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n \"visibility\": \"public\",\n \"date_created\": \"2017-03-02T11:22:49.481Z\",\n \"last_modified\": \"2017-03-02T11:22:49.481Z\",\n \"followers\": [\n   58b67331d0f41016cf97230d\n]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "post",
    "url": "/runs/:_id",
    "title": "unfollow a run",
    "name": "unfollowRun",
    "group": "runs",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ObjectId",
            "optional": false,
            "field": "followers",
            "description": "<p>unique Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\"followers\":\"58b67331d0f41016cf97230d\"\n}",
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
          "content": "{\n\"_id\": \"58b7ed442e4b9419b674c3a2\",\n\"name\": \"power run\",\n\"location\": \"nyayo stadium\",\n\"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n\"visibility\": \"public\",\n\"date_created\": \"2017-03-02T11:22:49.481Z\",\n\"last_modified\": \"2017-03-02T11:22:49.481Z\",\n\"followers\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "put",
    "url": "/runs/:_id",
    "title": "update run",
    "name": "updateRun",
    "group": "runs",
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
            "type": "String",
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
          "content": "{\n\"_id\": \"58b7ed442e4b9419b674c3a2\",\n\"name\": \"karura runners\",\n\"location\": \"nyayo stadium\",\n\"scheduled_date\": \"2014-03-05T00:00:00.000Z\",\n\"visibility\": \"public\",\n\"date_created\": \"2017-03-02T11:22:49.481Z\",\n\"last_modified\": \"2017-03-02T11:22:49.481Z\",\n\"followers\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/run.js",
    "groupTitle": "runs"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Signup User",
    "name": "CreateUser",
    "group": "users",
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
            "field": "password",
            "description": "<p>User Password</p>"
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
          "title": "Request Example:",
          "content": "{\n  \"first_name\": \"olivia\",\n  \"last_name\": \"Pope\",\n  \"email\": \"oliviapope@gmail.com\",\n  \"password\": \"whitehat\",\n  \"user_type\": \"consumer\"\n}",
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
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/users/:_id",
    "title": "GET one user",
    "name": "fetchOne",
    "group": "users",
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
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Unique password</p>"
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
          "content": " {\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-02-28T01:01:34.463Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"oliviapope@hotmail.com\",\n  \"password\": \"$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"runs_created\": [],\n    \"runs_joined\": []\n},\n  \"last_login\": \"2017-02-28T01:01:34.463Z\",\n  \"status\": \"active\",\n  \"realm\": \"user\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "get",
    "url": "/users/all",
    "title": "GET users collection",
    "name": "getUserCollection",
    "group": "users",
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
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Unique password</p>"
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
          "content": "[\n {\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-02-28T01:01:34.463Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"oliviapope@hotmail.com\",\n  \"password\": \"$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"runs_created\": [],\n    \"runs_joined\": []\n},\n  \"last_login\": \"2017-02-28T01:01:34.463Z\",\n  \"status\": \"active\",\n  \"realm\": \"user\n },\n{\n\"_id\": \"58b7df64854ee81424866639\",\n \"last_modified\": \"2017-03-02T09:01:24.324Z\",\n  \"date_created\": \"2017-03-02T09:01:24.109Z\",\n  \"username\": \"winnie10@yahoo.com\",\n  \"password\": \"$2a$07$inAjIjUi7fj63uSVi7b2NO.qCIHUljoLshMgyxHUisAVv0g2hb.Fq\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b7df64854ee8142486663a\",\n    \"user\": \"58b7df64854ee81424866639\",\n    \"first_name\": \"winnie\",\n    \"last_name\": \"nyabuti\",\n    \"email\": \"winnie10@yahoo.com\",\n    \"consumer\": \"58b7df64854ee8142486663b\",\n    \"last_modified\": \"2017-03-02T09:01:24.403Z\",\n    \"runs_created\": [],\n    \"runs_joined\": []\n  },\n  \"status\": \"active\",\n  \"realm\": \"user\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "users"
  },
  {
    "type": "put",
    "url": "/users/:_id",
    "title": "Update User",
    "name": "updateUser",
    "group": "users",
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
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Unique password9</p>"
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
          "content": "{\n  \"_id\": \"58b4c977d2795f3408c20ad3\",\n  \"last_modified\": \"2017-03-02T09:22:02.970Z\",\n  \"date_created\": \"2017-02-28T00:51:03.500Z\",\n  \"username\": \"olivia@popeAdocates.com\",\n  \"password\": \"$2a$07$FSULvTfsQOCxo9wLKEZ3u.XK9FaLSfVErAxlNo/cR8sDnpGE7i6Ea\",\n  \"role\": \"consumer\",\n  \"profile\": {\n    \"_id\": \"58b4c977d2795f3408c20ad4\",\n    \"user\": \"58b4c977d2795f3408c20ad3\",\n    \"first_name\": \"olivia\",\n    \"last_name\": \"pope\",\n    \"email\": \"oliviapope@hotmail.com\",\n    \"consumer\": \"58b4c977d2795f3408c20ad5\",\n    \"last_modified\": \"2017-02-28T00:51:03.531Z\",\n    \"runs_created\": [],\n    \"runs_joined\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/user.js",
    "groupTitle": "users"
  }
] });
