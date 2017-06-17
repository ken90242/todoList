<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       歡迎
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="帳號"
          type="text">
        </el-input>
        <el-input 
          v-model="pwd" 
          placeholder="密碼"
          type="password">
        </el-input>
        <el-button @click="login" type="primary">登入</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>

export default {
  data() {
    let account;
    let pwd;
    return { account, pwd };
  },
  methods: {
    login() {
      const data = { name: this.account, password: this.pwd };

      this.$http.post('/auth/user', data)
      .then((res) => {
        if (res.data.success === true) {
          this.$message({
            type: 'success',
            message: '登入成功',
          });
          Object.keys(res.data).forEach((key) => {
            sessionStorage.setItem(key, res.data[key]);
          });
          this.$router.push('/todolist');
        } else {
          this.$message.error(res.data.info); // 登录失败，显示提示语
          sessionStorage.setItem('token', null);
        }
      }, (err) => {
        this.$message.error('未知的請求错误！');
        sessionStorage.setItem('token', null);
        console.err(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-row.content {
    padding: 16px;
  }
  .title {
    font-size: 28px;
  }
  .el-input {
    margin: 12px 0
  }
  .el-button {
    width: 100%;
    margin-top: 12px;
  }
</style>
