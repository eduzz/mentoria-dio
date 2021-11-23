export const IS_DEVELOPMENT = true;

export const RABBIT_HOST= 'amqp://localhost';
export const RABBIT_USER='';
export const RABBIT_PASSWORD='';
export const RABBIT_PORT=5672;
export const RABBIT_DSN = IS_DEVELOPMENT ? `${RABBIT_HOST}` : ``;
