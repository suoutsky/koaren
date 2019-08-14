const {
  oss: config,
  upload
} = require('../config')
const OSS = require('ali-oss')
const {
  randomId
} = require('./index')
const path = require('path')
const stream = require('stream')
const store = new OSS({
  region: config.region,
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  bucket: config.bucket
})

let instance = async (filename, filestream, opts = {
  forceReplace: false, // 强制更新
  uuid: false, // 文件名称生成
  noCache: false // 文件不缓存
}) => {
  if (!filename || !(filestream instanceof stream.Readable)) {
    return Promise.reject('上传参数错误')
  }

  if (opts.uuid) {
    let dirname = path.dirname(filename)
    dirname = dirname === '.' ? '' : dirname + '/'
    filename = dirname + randomId() + path.extname(filename)
  }

  const uploadPath = upload.folder + filename

  let headers = {}
  if (opts.noCache) {
    headers['Cache-Control'] = 'no-cache'
  }

  if (opts.forceReplace && config.bucket === 'daily-duiba') {
    await store.delete(uploadPath)
  }

  return new Promise((resolve, reject) => {
    store.putStream(uploadPath, filestream, {
      headers
    }).then((result) => {
      if (result.url) {
        resolve(`//${upload.domain}/${uploadPath}`)
      } else {
        reject(result)
      }
    })
  })
}

module.exports = instance
