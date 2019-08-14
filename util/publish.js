const util = require('./index')
const upload = require('./upload')
const {
  strToStream,
  randomId,
  combineDocRes
} = util

const publish = async (config = {}, template = '') => {
  let {
    components,
    title,
    id
  } = config

  if (!id || !title || !util.checkType(components, 'Array') || !util.checkType(template, 'String')) {
    return Promise.reject(new Error('参数错误'))
  }

  let domRes = combineDocRes(components)
  let { html, css, js } = domRes

  let basePath = `activity/${randomId()}/index`
  template = template.replace('{{injecthtml}}', html).replace('{{injecttitle}}', title).replace('{{injectcss}}', '<link rel="stylesheet" href="index.css" />').replace('{{injectjs}}', '<script src="index.js"></script>')

  return Promise.all([upload(`${basePath}.css`, strToStream(css)), upload(`${basePath}.js`, strToStream(js)), upload(`${basePath}.html`, strToStream(template))]).then(res => {
    return Promise.resolve(res[2])
  }).catch(err => Promise.reject(err))
}

module.exports = publish
