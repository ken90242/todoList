<template>
<el-row>
<el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
  <el-button @click="logOut" size="small" type="text"  @keyup.enter.native="addTodo">登出</el-button>

  <strong> 好久不見！{{ name }}，你的待辦事項為：</strong>
  <el-input placeholder="請輸入待辦事項" v-model="inputTodo" @keyup.enter.native="addTodo"></el-input>
  <el-tabs v-model="activeSection">
    <el-tab-pane label="待辦事項" @click="DisplaySection='todo'" name="todoSection">
      <el-col :xs="24">
        <template v-if="activeSection === 'todoSection'">
          <todoItem v-for="todo,idx in todos" :key="todo.id" @finished="updateTodo(todo)" @deleted="removeTodo(idx)" :content="todo.content"/>
        </template>
        <div v-else>
          暫無待辦事項
        </div>
      </el-col>
    </el-tab-pane>
    <el-tab-pane label="已完成事項" @click="DisplaySection='ok'" name="okSection">
      <template v-if="activeSection === 'okSection'">
        <okItem v-for="ok, idx in oks" :key="ok.id" @recovered="updateTodo(ok)" :content="ok.content" />
      </template>
      <div v-else>
        暫無已完成事項
      </div>
    </el-tab-pane>
  </el-tabs>
</el-col>
</el-row>
</template>

<script>
import todoItem from './TodoItem';
import okItem from './okItem';

export default {
  created() {
    const userInfo = this.getUserInfo();
    this.name = userInfo.name;
    this.id = userInfo.id;
    this.getTodolist();
  },
  data() {
    const todos = [];
    const oks = [];
    const id = '';
    const name = '';
    const inputTodo = null;
    return { id, name, todos, oks, inputTodo, activeSection: 'todoSection' };
  },
  methods: {
    logOut() {
      sessionStorage.clear();
      this.$message({
        type: 'success',
        message: '成功登出',
      });
      this.$router.push('/');
    },
    updateTodo(item) {
      this.$http.put(`/api/list/${this.id}/${item.item_id}/${item.status}`) // 新增创建请求
        .then((res) => {
          if (res.status === 200) { // 当返回的状态为200成功时
            this.$message({
              type: 'success',
              message: '更新完成',
            });
            this.getTodolist(); // 获得最新的todolist
          } else {
            console.error('更新失敗！'); // 当返回不是200说明处理出问题
          }
        }, (err) => {
          console.err(`${err},更新失败！`);// 当没有返回值说明服务端错误或者请求没发送出去
        });
    },
    removeTodo(idx) {
      this.$http.delete(`/api/list/${this.id}/${this.todos[idx].item_id}`) // 新增创建请求
        .then((res) => {
          if (res.status === 200) { // 当返回的状态为200成功时
            this.$message({
              type: 'success',
              message: '刪除成功',
            });
            this.getTodolist(); // 获得最新的todolist
          } else {
            console.error('刪除失敗'); // 当返回不是200说明处理出问题
          }
        }, (err) => {
          console.error(`${err}, 刪除失敗！`);// 当没有返回值说明服务端错误或者请求没发送出去
        });
    },
    addTodo() {
      if (this.inputTodo === '') {
        return;
      }
      const obj = {
        status: false,
        content: this.inputTodo,
        id: this.id,
      };
      this.$http.post('/api/list', obj) // 新增创建请求
        .then((res) => {
          if (res.status === 200) { // 当返回的状态为200成功时
            this.$message({
              type: 'success',
              message: '新增成功！',
            });
            this.getTodolist(); // 获得最新的todolist
          } else {
            this.$message.error('新增失敗！'); // 当返回不是200说明处理出问题
          }
        }, (err) => {
          this.$message.error('新增失敗！'); // 当没有返回值说明服务端错误或者请求没发送出去
          console.err(err);
        });
      this.inputTodo = ''; // 将当前todos清空
    },
    getUserInfo() { // 获取用户信息
      const token = sessionStorage.getItem('token');
      if (token !== null && token !== 'null') {
        const name = sessionStorage.getItem('name');
        const id = sessionStorage.getItem('id');
        return { id, name }; // decode解析出来实际上就是{name: XXX,id: XXX}
      }
      return null;
    },
    getTodolist() {
      this.$http.get(`/api/list/${this.id}`) // 向后端发送获取todolist的请求
        .then((res) => {
          if (res.status === 200) {
            this.todos = res.data.filter(v => v.status === false); // 将获取的信息塞入实例里的list
            this.oks = res.data.filter(v => v.status === true);
          } else {
            this.$message.error('獲取待辦列表失敗！');
          }
        }, (err) => {
          this.$message.error('獲取待辦列表失敗！');
          console.err(err);
        });
    },
  },
  components: {
    todoItem, okItem,
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  margin: 20px auto
}
.el-button {
  margin-right: 10px;
  font-size: 10px;
  &:hover {
    color:red;
  }
  // float: left;
  // margin: 20px auto 
}
</style>
