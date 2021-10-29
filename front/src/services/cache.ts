import dateFnsAddMinutes from 'date-fns/addMinutes';
import dateFnsIsBefore from 'date-fns/isBefore';

import storageService from './storage';

export interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate?: Date;
}

export interface ICacheWatcher<T> {
  (value: T): void;
}

export class CacheService {
  private memory: { [key: string]: ICache };
  private watchers: { [key: string]: ICacheWatcher<any>[] };

  constructor() {
    this.memory = {};
    this.watchers = {};
  }

  public async get<T = any>(key: string): Promise<T> {
    let cache = this.memory[key] ?? storageService.get(`app-cache-${key}`);

    if (this.isExpirated(cache)) {
      cache = null;
    }

    return cache?.data;
  }

  public async fromPromise<T>(key: string, promise: () => Promise<T>): Promise<T> {
    const cache = this.get<T>(key);
    if (cache) return cache;

    const data = await promise();
    return this.save<T>(key, data);
  }

  public watch<T>(key: string, callback: ICacheWatcher<T>): () => void {
    this.get<T>('key').then(cache => callback(cache));
    this.watchers[key] = [...(this.watchers[key] ?? []), callback];

    return () => {
      this.watchers[key] = this.watchers[key].filter(w => w !== callback);
    };
  }

  public remove(key: string) {
    this.memory[key] = null;
    storageService.remove(`app-cache-${key}`);
    this.sendWatchData(key, null);
  }

  public async save<T>(key: string, data: T, options?: { persist?: boolean; expirationMinutes?: number }): Promise<T> {
    const cache: ICache<T> = {
      createdAt: new Date(),
      expirationDate: options.expirationMinutes ? dateFnsAddMinutes(new Date(), options?.expirationMinutes ?? 5) : null,
      data
    };

    options?.persist ? storageService.set(`app-cache-${key}`, cache) : (this.memory[key] = cache);

    this.sendWatchData(key, cache);
    return cache.data;
  }

  public isExpirated(cache: ICache): boolean {
    if (!cache.expirationDate) return false;
    return dateFnsIsBefore(cache.expirationDate, new Date());
  }

  public async clear(): Promise<void> {
    this.memory = {};
    storageService.clear(key => key.startsWith('app-cache'));
  }

  private sendWatchData(key: string, data: any) {
    if (!this.watchers[key]?.length) return;
    this.watchers[key].forEach(watcher => watcher(data));
  }
}

const cacheService = new CacheService();
export default cacheService;
