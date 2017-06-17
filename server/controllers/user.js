// controllers/user.js 
const user = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const getUserInfo = async function(ctx) {
  const id = ctx.params.id; // 获取url里传过来的参数里的id
  const res = await user.getUserById(id);  // 通过yield “同步”地返回查询结果
  ctx.body = res; // 将请求的结果放到response的body里返回
};

const postUserAuth = async function(ctx) {
  const data = ctx.request.body; // post过来的数据存在request.body里
  const userInfo = await user.getUserByName(data.name);
  if (userInfo != null){ // 如果查无此用户会返回null
    if (!bcrypt.compareSync(data.password, userInfo.password)){
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密碼錯誤！'
      }
    } else{ // 如果密码正确
      const userToken = {
        name: userInfo.user_name,
        id: userInfo._id
      }
      const secret = 'vue-koa-demo'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken,secret); // 签发token
      ctx.body = {
        success: true,
        name: userToken.name,
        id: userToken.id,
        token: token, // 返回token
      }
    }
  } else{
    ctx.body = {
      success: false,
      info: '帳號不存在！' // 如果用户不存在返回用户不存在
    }
  }
}

module.exports = { getUserInfo, postUserAuth };