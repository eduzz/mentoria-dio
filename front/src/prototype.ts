/* eslint-disable @typescript-eslint/naming-convention */
import Loader from '@/components/Globals/Loader';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Promise<T> {
    loader: () => Promise<T>;
  }
}

Promise.prototype.loader = function () {
  Loader.promise(this);
  return this;
};
