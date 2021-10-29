import { apiResponseFormatter } from '../formatters/apiResponse';
import logService from './log';

export class StorageService {
  public get<T = any>(key: string): T {
    try {
      const data = localStorage.getItem(key);
      return data ? apiResponseFormatter(JSON.parse(data)) : null;
    } catch (err) {
      logService.handleError(err);
      return null;
    }
  }

  public set<T = any>(key: string, value: T): T {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(filter?: (key: string) => boolean): void {
    let keys = Object.keys(localStorage);

    if (filter) {
      keys = keys.filter(k => filter(k));
    }

    keys.forEach(k => localStorage.removeItem(k));
  }
}

const storageService = new StorageService();
export default storageService;
