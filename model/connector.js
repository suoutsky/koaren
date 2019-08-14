const Sequelize = require('sequelize')

const dbConfig = {
    database: 'login',
    username: 'root',
    password: 'Su123456',
    host: 'localhost',
    dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql'
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    // 设置时区
    timezone: '+08:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    
    // define: {
    // 全局设置引擎, 默认是 InnoDB
    //     engine: 'MYISAM', 
    // SQLite only
    // storage: 'path/to/database.sqlite'
});
sequelize
  .authenticate() //校验数据库连接
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
module.exports = sequelize;