# backend_test
This repo contains CRUD backend API with Societe and User model handle with Sequelize. "backend test : node.js, sequelize, mocha"

## Project setup : 
`node index.js`

## Launch mocha test :
`npm test`

## Societe API :

+ GET /api/societe/ => get all societe object
+ GET /api/societe/:id => get societe object by id
+ POST /api/societe/ => add societe

{
    "title":"Comptalib",
    "adresse":"Paris / Nancy",
    "siret": "0000000",
    "email":"contact@comptalib.fr",
	"phone":"0186909280"
}

+ POST /api/societe/add-user/

{
"userId":1
"societeId":1
}

+ DELETE /api/societe/ => delete all  societe object
+ DELETE /api/societe/:id => delete societe object by id
+ PUT /api/societe/:id => update societe object by id

## User API :

+ GET /api/user/ => get all user object
+ GET /api/user/:id => get user object by id
+ POST /api/user/ => add user

{
    "firstname":"John",
    "lastname":"Doe 2"
}

+ POST /api/user/add-societe/

{
"userId":1
"societeId":1
}

+ DELETE /api/user/ => delete all user object
+ DELETE /api/user/:id => delete user object by id
+ PUT /api/user/:id => update user object by id

API test have been done with Postman ( set Header : Content-Type application/json)
