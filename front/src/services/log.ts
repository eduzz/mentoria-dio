import * as Sentry from '@sentry/browser';

import IUserToken from '../interfaces/tokens/userToken';
import { ENV, IS_DEVELOPMENT, SENTRY_KEY } from '../settings';

export class LogService {
  constructor() {
    Sentry.init({ dsn: SENTRY_KEY, environment: ENV });
  }

  public setUser(user: IUserToken): void {
    if (!user) {
      Sentry.setUser(null);
      return;
    }

    Sentry.setUser({ id: user.id.toString(), email: user.email, username: user.email, extra: { ...user } });
  }

  public breadcrumb(message: string, category = 'manual', data: any = {}): void {
    Sentry.addBreadcrumb({ message, category, data });
  }

  public handleError(err: any): void {
    if (!err) return;

    if (typeof err === 'string') {
      err = new Error(err);
    }

    if (IS_DEVELOPMENT) {
      console.error(err);
    }

    if (err.ignoreLog) {
      return;
    }

    Sentry.withScope(() => {
      Sentry.setExtras({ extra: err.extraData || {} });
      Sentry.captureException(err);
    });
  }
}

const logService = new LogService();
export default logService;
