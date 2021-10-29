import { dateParse } from '@/formatters/date';

export function apiResponseFormatter<T extends { [key: string]: any }>(obj: T): T {
  if (!obj) return obj;

  if (Array.isArray(obj)) {
    return obj.map(i => apiResponseFormatter(i)) as any;
  }

  if (typeof obj === 'string' && isValidDateString(obj)) {
    return dateParse(obj) as any;
  }

  if (typeof obj === 'object' && !(obj instanceof Date)) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = apiResponseFormatter(obj[key]);
      return acc;
    }, {}) as any;
  }

  return obj;
}

function isValidDateString(value: any): boolean {
  return /^(\d{4})-(\d{2})-(\d{2})([T\s](\d{2}):(\d{2}):(\d{2})(\.(\d+)(Z)?)?)?$/.test(value);
}
