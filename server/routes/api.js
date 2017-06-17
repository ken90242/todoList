// server/routes/api.js
const todolist = require('../controllers/todolist.js');
const router = require('koa-router')();

router.get('/list/:id', todolist.getTodolist),
router.post('/list', todolist.createTodolist),
router.delete('/list/:userId/:id', todolist.removeTodolist),
router.put('/list/:userId/:id/:status', todolist.updateTodolist)

module.exports = router; // 导出router规则