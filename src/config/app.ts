export const appConfig = {
  PORT: process.env.NODE_PORT || 4005,
  HOST: process.env.NODE_HOST || '0.0.0.0',
  API_PREFIX: process.env.API_PREFIX || '/api',
  PROJECTS: process.env.PROJECTS?.split(', ') || ['test'],
  REQUEST_MAX_SIZE: '50mb',
  REQUEST_PARAM_LIMIT: 50000
}
