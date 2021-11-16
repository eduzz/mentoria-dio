export const IS_DEVELOPMENT = true;
export const RABBIT_HOST= 'amqp://localhost';
export const RABBIT_USER='';
export const RABBIT_PASSWORD='';
export const RABBIT_PORT=5672;
export const RABBIT_DSN = IS_DEVELOPMENT ? `${RABBIT_HOST}` : ``;

export const SENDGRID_TOKEN = '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';
