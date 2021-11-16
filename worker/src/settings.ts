export const IS_PROD = false;

export const RABBIT_HOST= IS_PROD ? '' : 'amqp://localhost';
export const RABBIT_USER= IS_PROD ? '' : '';
export const RABBIT_PASSWORD= IS_PROD ? '' : '';
export const RABBIT_PORT= IS_PROD ? 5672 : 5672;
export const RABBIT_DSN = `${RABBIT_HOST}`;

export const SENDGRID_TOKEN = '';
