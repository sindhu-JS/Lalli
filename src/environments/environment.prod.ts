export const environment = {
  production: true,
  apiUrl: 'https://api.your-domain.com/api',
  appName: 'Lalli App',
  version: '1.0.0',
  enableDebugTools: false,
  logLevel: 'error',
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableReporting: true,
    maxFileUploadSize: 10 * 1024 * 1024, // 10MB
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpirationBuffer: 60000, // 1 minute
  },
  api: {
    timeout: 30000, // 30 seconds
    retries: 2,
  },
};