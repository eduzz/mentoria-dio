export const ENV = (process.env.REACT_APP_ENV as string) || 'production';

export const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT as string) || '';
export const CDN_ENDPOINT = (process.env.REACT_APP_CDN_ENDPOINT as string) || '';
export const SENTRY_KEY = (process.env.REACT_APP_SENTRY_KEY as string) || '';

export const IS_DEVELOPMENT = ENV === 'development';

if (!API_ENDPOINT) console.log('API IN MOCK MODE');
