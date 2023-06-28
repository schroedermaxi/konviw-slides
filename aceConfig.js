const baseConfig = {
  errorTemplate: true,
  store: {
    adapter: 'vercel',
    EDGE_CONFIG_API_URL: process.env.EDGE_CONFIG_API_URL,
    EDGE_CONFIG_ID: process.env.EDGE_CONFIG_ID,
    EDGE_CONFIG_TOKEN: process.env.EDGE_CONFIG_TOKEN,
    EDGE_CONFIG_VERCEL_API_URL: process.env.EDGE_CONFIG_VERCEL_API_URL,
    EDGE_CONFIG_VERCEL_TEAM_ID: process.env.EDGE_CONFIG_VERCEL_TEAM_ID,
    EDGE_CONFIG_VERCEL_API_TOKEN: process.env.EDGE_CONFIG_VERCEL_API_TOKEN,
  },
};

const aceConfig = {
  config: {
    development: {
      environment: 'development',
      port: 3000,
      ...baseConfig,
    },
    production: {
      environment: 'production',
      port: process.env.PORT,
      ...baseConfig,
      localBaseUrl: process.env.APP_BASE_URL,
      product: 'confluence'
    }
  }
}

export default aceConfig
