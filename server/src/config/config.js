module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'vuetibit',
    user: process.env.DB_USER || 'vuetibit',
    password: process.env.DB_PASS || 'vuetibit',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './vuetibit.sqlite'
    }
  }
}
