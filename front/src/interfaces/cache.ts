export interface ICacheCollection {
  [key: string]: ICache;
}

export default interface ICache<T = any> {
  data: T;
  createdAt: Date;
  expirationDate: Date;
}
