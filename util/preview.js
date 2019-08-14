const util = require('./index')
const {
  combineDocRes
} = util

const preview = (config = {}, template = '') => {
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

  template = template.replace('{{injecthtml}}', html).replace('{{injecttitle}}', title).replace('{{injectjs}}', `<script type='text/javascript'>${js}</script>`).replace('{{injectcss}}', `<style type='text/css'>\n${css}\n</style>`)

  return template
}

module.exports = preview
