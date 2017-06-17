// server/models/todolist.js
const dbs = require('../config/db.js');
const ObjectID = require('mongodb').ObjectID;

async function getTodolistById(id) {  // 获取某个用户的全部todolist
  const db = await dbs;
  const coll = db.collection('list');
  const res = await coll.find({ user_id: ObjectID(id) }).toArray();
  return res // 返回数据
}

async function createTodolist(data) { // 给某个用户创建一条todolist
  const db = await dbs;
  const coll = db.collection('list');
  await coll.insertOne({
    user_id: ObjectID(data.id), // 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status 
  });
  
  return true
}

async function removeTodolist(id, user_id) {
  const db = await dbs;
  const coll = db.collection('list');
  await coll.deleteOne({
    _id: ObjectID(id),
    user_id: ObjectID(user_id),
  });
  return true;
}

async function updateTodolist(id, user_id, status) {
  const db = await dbs;
  const coll = db.collection('list');
  await coll.updateOne({ _id: ObjectID(id), user_id: ObjectID(user_id) }, { $set:{ status } } );
  return true;
}

module.exports = { getTodolistById, createTodolist, removeTodolist, updateTodolist };