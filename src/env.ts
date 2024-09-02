export const env = {
  app: {
    /** This comes from package.json */
    version: process.env.npm_package_version || '0.0.1',
    port: parseInt(process.env.APP_PORT || '3000', 10),
  },
  openApi: {
    title: process.env.OPEN_API_TITLE || 'Example API',
    description: process.env.OPEN_API_DESCRIPTION || 'This is an example API',
    path: process.env.OPEN_API_PATH || 'api',
  },
};
