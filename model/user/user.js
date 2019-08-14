const Sequelize = require('sequelize')
const instance = require('../connector')
const baseModel = require('../base').model
const baseOption = require('../base').option
const util = require('../../util')

const model = Object.assign({}, baseModel, {
  // 字段定义
  email: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  },
  passwd: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  },
  authType: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  },
  authKey: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  }
})

const option = Object.assign({}, baseOption, {
  // 配置

})

const modelDefine = instance.define('sys_user', model, option)

modelDefine.findOneUser = function(options) {
  options = util.filterNull(options)

  return modelDefine.findOne({
    where: options
  })
}

// let findOneByUsername = async username => {
//   let user = await User.findOne({
//     where: {
//       username
//     }
//   });
//   return user;
// };
modelDefine.createUser = function(options) {
  return modelDefine.create(options)
}

module.exports = modelDefine
