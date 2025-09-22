export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Lalli App',
  version: '1.0.0',
  enableDebugTools: true,
  logLevel: 'debug',
  features: {
    enableNotifications: true,
    enableAnalytics: false,
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
