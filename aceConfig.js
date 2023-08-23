const aceConfig = {
  config: {
    development: {
      port: 3000,
      errorTemplate: true,
      store: {
        adapter: 'sequelize',
        dialect: 'sqlite3',
        logging: false,
        type: 'memory'
      }
    },
    production: {
      environment: 'production',
      port: process.env.POSTGRES_PORT,
      store: {
        adapter: 'sequelize',
        dialect: 'postgres',
        url: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_URL}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
        pool: {
          max: 1,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      },
      errorTemplate: true,
      localBaseUrl: process.env.APP_BASE_URL,
      product: 'confluence'
    }
  }
}

export default aceConfig