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
                url: process.env.DATABASE_URL
            },
            errorTemplate: true,
            localBaseUrl: process.env.APP_BASE_URL,
            product: 'confluence'
        }
    }
}

export default aceConfig
