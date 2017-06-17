# todoList

> A Vue+koa+mongodb project

## Pre-Setup
```
1. Install Mongodb
2. Update the database
  * create database: todolist
  * create two tables: 
    - (1) list (_id, user_id, content, status)
    - (2) user (_id, user_name, password)
  * Insert val:
    - No need to insert _id value, it will be created by mongodb automatically
    - password need to be encryted by bcrypt, caused it will be examined
  * Port number: 27017
3. start mongod
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
