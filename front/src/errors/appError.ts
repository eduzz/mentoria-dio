export default class AppError<T = any> extends Error {
  public readonly ignoreLog: boolean;
  public readonly extraData: T;

  constructor(message: string, extraData?: T, ignoreLog = true) {
    super(message);
    this.extraData = extraData || null;
    this.ignoreLog = ignoreLog;
  }
}
