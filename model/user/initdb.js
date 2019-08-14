const isForce = false
const user = require('./user')

user.sync({
  force: isForce
}).then(() => {

})
