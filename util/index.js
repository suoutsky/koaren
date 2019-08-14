const {
  Duplex
} = require('stream')
const bson = require('bson')
const fs = require('fs')
const path = require('path')
const arrayUnion = require('array-union')

const util = {
  // 生成一个id
  randomId: () => {
    return bson.ObjectId()
  },

  // 字符串转换为流
  strToStream: (str) => {
    var buf = Buffer.from(str)
    return util.bufferToStream(buf)
  },

  // buffer转换为流
  bufferToStream: (buffer) => {
    let stream = new Duplex()
    stream.push(buffer)
    stream.push(null)
    return stream
  },

  // 深度合并
  merge: function (target, source) {
    var newObj = Object.assign({}, target)
    for (let x in source) {
      if (util.checkType(source[x])) {
        newObj[x] = util.merge(newObj[x], source[x])
      } else {
        newObj[x] = source[x]
      }
    }
    return newObj
  },

  // 检查数据类型
  checkType: function (o, type) {
    return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']'
  },

  // 深度删除键值为空的key
  filterNull: (obj) => {
    if (!util.checkType(obj, 'Object')) return obj
    let source = Object.assign({}, obj)

    for (var i in source) {
      if (!source[i]) delete source[i]
      if (util.checkType(source[i])) {
        return util.filterNull(source[i])
      }
    }

    return source
  },

  // 时间格式化
  dateFormat: function (date, fmt) {
    date = new Date(date)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    return fmt
  },

  // 生成html,css,js
  combineDocRes: (components) => {
    if (!util.checkType(components, 'Array')) return components
    let html = ''

    let css = ''

    let js = ''

    components.forEach(item => {
      html += item.html || ''
      css += item.css || ''
      js += `(function(){var opts=${JSON.stringify(item.option) || {}};${item.js || ''}})();`
    })

    return {
      html,
      css,
      js
    }
  },

  // 读取文件内容
  getTemplate: (filepath) => {
    filepath = path.resolve(__dirname, filepath)
    return (fs.readFileSync(filepath)).toString()
  },

  // 数组合并去重
  mergeArray: (target, source) => {
    return arrayUnion(target, source)
  }
}

module.exports = util
