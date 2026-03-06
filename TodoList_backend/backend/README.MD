create folder -->
backend -open into vs code
create folder backend-->open integrated terminal

## type command##

-->npm init or || npm init -y
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See npm help init for definitive documentation on these fields
and exactly what they do.

### just enter

Use npm install <pkg> afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (server)
version: (1.0.0)  
description:  
entry point: (index.js)  
test command:  
git repository:  
keywords:  
author:  
license: (ISC)  
type: (commonjs)  
About to write to D:\backend\server\package.json:

{
"name": "server",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC",
"type": "commonjs"
}

Is this OK? (yes)

### Create file

index.js

## to run code

PS D:\backend\server> node --version
v24.12.0
PS D:\backend\server> node index.js
node
PS D:\backend\server> node app/index.js
node

# packet.json##

"scripts": {
"start": "node index.js",
"test": "echo \"Error: no test specified\" && exit 1"
}

## to run code

PS D:\backend\server> npm run start

### To reflect the saved changes auto

PS D:\backend\server> npm i nodemon
or PS D:\backend\server> npm i nodemon -g

## to run code

PS D:\backend\server> nodemon App/index.js

## dev##

"scripts": {
"dev": "nodemon app/index.js",
"start": "node app/index.js",
"test": "echo \"Error: no test specified\" && exit 1"
},
"dependencies": {
"nodemon": "^3.1.14"
}

## to run code

PS D:\backend\server> npm run dev

## install express


const express = require("express");// IT IS A library it has to installed

PS D:\backend\server> npm i express

## install cors
const cors = require('cors');// IT IS A library it has to installed
PS D:\backend\server> npm i cors

## install morgan
const morgan = require('morgan');// IT IS A library it has to installed
PS D:\backend\server> npm i morgan



## install sequelize
const {Sequelize} = require('sequelize'); // required for db.js
 PS D:\backend\server> npm i sequelize

 ## install  
 --npm i pg  (for postgresql) 

