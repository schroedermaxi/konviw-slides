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
            port: process.env.PORT,
            store: {
                adapter: 'sequelize',
                dialect: 'postgres',
                url: process.env.DATABASE_URL,
                pool: {
                    max: 18,
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
