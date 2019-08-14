const chalk = require('chalk')

class Logger {
  log (msg) {
    console.log(msg)
  }

  info(msg) {
    console.log(chalk.blue(msg))
  }

  error(msg) {
    console.log(chalk.red(msg))
  }

  warn(msg) {
    console.log(chalk.yellow(msg))
  }

  success(msg) {
    console.log(chalk.green(msg))
  }
}

module.exports = new Logger()
