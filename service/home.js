const userDao = require('../model/user/user')
module.exports = {
  sign: async function(username, passwd) {
    let data 
    let user = await userDao.findOneUser({username});
    if(user && user.passwd === passwd){
      data = {
        status: 0,
        data: {
          title: "个人中心",
          content: "欢迎进入个人中心"
        }
      }
    }else{
      data = {
        status: -1,
        data: {
          title: '登录失败',
          content: "请输入正确的账号信息"
        }
      }
    }
    return data
  },
  register: async function(email, passwd, username, authType, authKey) {
    console.log(email, passwd, username, authType, authKey);
    let opt = {
      email, 
      passwd, 
      username, 
      authType, 
      authKey
    }
    //  let res = await userDao.createUser(opt);
    //  return res;
  }

}