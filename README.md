# todoList

> A Vue+koa+mongodb project

![image](https://github.com/ken90242/todoList/blob/master/demo.gif)
### Learn from the tutorial: https://molunerfinn.com/Vue+Koa/
### Original github work: https://github.com/Molunerfinn/vue-koa-demo

## Pre-Setup
``` bash
# Install Mongodb

# Update the database

  1. create database: todolist
  
  2. create two tables: 
    - (1) list (_id, user_id, content, status)
    - (2) user (_id, user_name, password)
    
  3. Insert val:
    - No need to insert _id value, it will be created by mongodb automatically
    - password need to be encryted by bcrypt, caused it will be examined
    
  4. Port number: 27017
  
# start mongod
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
