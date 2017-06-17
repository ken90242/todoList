// server/controllers/todolist
const todolist = require('../models/todolist.js');

const getTodolist = async function(ctx) { // 获取某个用户的所有todolist
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const result = await todolist.getTodolistById(id);  // 通过yield “同步”地返回查询结果
  result.forEach((ele) => {
    ele.item_id = ele['_id'];
    delete ele['_id'];
  });
  ctx.body = result // 将请求的结果放到response的body里返回
}

const createTodolist = async function(ctx) { // 给某个用户创建一条todolist
  const data = ctx.request.body; // post请求，数据是在request.body里的
  const result = await todolist.createTodolist(data);

  ctx.body = {
    success: true
  }
}

const removeTodolist = async function(ctx) {
  const userId = ctx.params.userId;
  const id = ctx.params.id;
  const result = await todolist.removeTodolist(id, userId);

  ctx.body = {
    success: true
  }
}

const updateTodolist = async function(ctx) {
  const userId = ctx.params.userId;
  const id = ctx.params.id;
  let status = ctx.params.status;
  status === 'false' ? status = true : status = false;

  const result = await todolist.updateTodolist(id, userId, status);

  ctx.body = {
    success: true
  }
}


module.exports = { getTodolist, createTodolist, removeTodolist, updateTodolist };