const Sequelize = require('sequelize')
const util = require('../util')
const baseModel = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    get () {
      return util.dateFormat(this.getDataValue('createdAt'), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    get () {
      return util.dateFormat(this.getDataValue('updatedAt'), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  creator: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  },
  revisor: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false
  }
}

const baseOption = {
  paranoid: true,
  hooks: {
    beforeCreate: (instance, options) => {
      instance.creator = instance.revisor
    }
  }
}

module.exports = {
  model: baseModel,
  option: baseOption
}
